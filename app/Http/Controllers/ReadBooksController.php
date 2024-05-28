<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Book;
use App\Models\Genre;
use App\Models\Publisher;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReadBooksController extends Controller
{
    public function GetReadBooks($userId) {
        $books = Book::with(['genres', 'publisher', 'userLike', 'ratings'])
            ->whereHas('readBooks', function($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->with(['rating' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }])
            ->get();

        return $books;
    }

    public function AddToReadBooks(Request $request) {
        $userId = Auth::user()->id;
        $bookId = $request->id;
        $book = Book::find($bookId);

        $readlist = DB::table('readlist')->where('book_id', $bookId)->where('user_id', $userId)->first();
        if ($readlist != null) {
            DB::table('readlist')->where('book_id', $bookId)->where('user_id', $userId)->delete();
        }

        $book->readBooks()->attach($userId);
        return redirect()->back()->withSuccess('Book added to read books');
    }

    public function RemoveFromReadBooks(Request $request) {
        $userId = Auth::user()->id;
        $bookId = $request->id;
        $book = Book::find($bookId);

        $rated = DB::table('ratings')->where('book_id', $bookId)->where('user_id', $userId)->first();
        if ($rated != null) {
            return redirect()->back()->withErrors("error", "Can't remove book from read list if already rated");
        }

        $liked = DB::table('likes')->where('book_id', $bookId)->where('user_id', $userId)->first();
        if ($liked != null) {
            return redirect()->back()->withErrors("error", "Can't remove book from read list if already liked");
        }

        $book->readBooks()->detach($userId);
        return redirect()->back()->withSuccess('Book removed from read books');
    }
}
