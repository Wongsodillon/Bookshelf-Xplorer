<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\Book;
use App\Models\Genre;
use App\Models\Publisher;
use App\Models\ReadList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReadListController extends Controller
{

    public function GetReadList(Request $request) {
        $user = RegisteredUserController::GetUserProfile($request->username);
        if (!$user) {
            return redirect()->route('dashboard');
        }
        $genres = Genre::all();
        $publishers = Publisher::all();
        $books = Book::with(['genres', 'publisher', 'ratings', 'userReadList'])
            ->whereHas('readList', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();
        return Inertia::render('Profile/ReadList', [
            'books' => $books,
            'genres' => $genres,
            'publishers' => $publishers,
            'user' => $user
        ]);
    }

    public function AddToReadList(Request $request) {
        $user = Auth::user();
        $bookId = $request->id;

        $readList = ReadList::where("user_id", $user->id)->where("book_id", $bookId)->first();
        if ($readList) {
            return redirect()->back()->with("error", "Book already in read list");
        }
        ReadList::insert([
            "user_id" => $user->id,
            "book_id" => $bookId,
            "created_at" => now(),
            "updated_at" => now()
        ]);
        return redirect()->back()->with("success", "Book added to read list");
    }

    public function RemoveFromReadList(Request $request) {
        $user = Auth::user();
        $bookId = $request->id;

        ReadList::where("user_id", $user->id)->where("book_id", $bookId)->delete();
        return redirect()->back()->with("success", "Book removed from read list");
    }
}
