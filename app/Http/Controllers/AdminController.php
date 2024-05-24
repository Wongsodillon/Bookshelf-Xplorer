<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Genre;
use App\Models\Publisher;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function AdminDashboard() {
        $books = Book::with(['genres', 'publisher', 'ratings'])->get();
        return Inertia::render('Admin/AdminDashboard', [
            'books' => $books,
        ]);
    }

    public function AddNewBook() {
        $genres = Genre::all();
        $publishers = Publisher::all();
        return Inertia::render('Admin/AddNewBook', [
            'genres' => $genres,
            'publishers' => $publishers
        ]);
    }

    public function EditBook(Request $request) {
        $book = Book::with(['genres', 'publisher'])->find($request->id);
        if (!$book) {
            return redirect()->route('admin.dashboard');
        }
        $genres = Genre::all();
        $publishers = Publisher::all();
        return Inertia::render('Admin/EditBook', [
            'book' => $book,
            'genres' => $genres,
            'publishers' => $publishers
        ]);
    }

    public function GetUsers() {
        $users = User::where('role', 'user')->get();
        return Inertia::render('Admin/UserManagement', [
            'users' => $users
        ]);
    }

    public function BanUser(Request $request) {
        $user = User::find($request->id);
        if (!$user) {
            return redirect()->route('admin.users');
        }
        DB::table('users')->where('id', $user->id)->update(['status' => 0]);
        return redirect()->route('admin.users');
    }

    public function UnbanUser(Request $request) {
        $user = User::find($request->id);
        if (!$user) {
            return redirect()->route('admin.users');
        }
        DB::table('users')->where('id', $user->id)->update(['status' => 1]);
        return redirect()->route('admin.users');
    }

    public function UserDetails(Request $request) {
        $user = User::where('username', $request->username)
            ->withCount('Lists')
            ->withCount('readBooks')
            ->withCount('readList')
            ->withCount('ratings')
            ->withCount('likes')
            ->withCount('Followers')
            ->withCount('Following')
            ->first();
        if (!$user) {
            return redirect()->route('admin.users');
        }
        $reviews = Rating::with(['User', 'Book', 'liked'])
            ->where('user_id', $user->id)
            ->where('review', '!=', null)
            ->withCount('likes')
            ->get();
        return Inertia::render('Admin/UserDetails', [
            'user' => $user,
            'reviews' => $reviews,
        ]);
    }

}
