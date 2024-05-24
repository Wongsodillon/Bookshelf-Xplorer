<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikesController extends Controller
{
    public function LikeBook(Request $request) {
        $bookId = $request->book_id;
        $userId = auth()->user()->id;

        $book = Book::find($bookId);

        $readlist = DB::table('readlist')->where('book_id', $bookId)->where('user_id', $userId)->first();
        if ($readlist != null) {
            DB::table('readlist')->where('book_id', $bookId)->where('user_id', $userId)->delete();
        }

        $read = DB::table('read_books')->where('book_id', $bookId)->where('user_id', $userId)->first();
        if ($read == null) {
            $book->readBooks()->attach($userId);
        }

        $book->likes()->attach($userId, ['created_at' => now(), 'updated_at' => now()]);
        return redirect()->back()->with("success", "Book liked");
    }

    public function UnlikeBook(Request $request) {
        $bookId = $request->book_id;
        $userId = auth()->user()->id;

        $book = Book::find($bookId);
        $book->likes()->detach($userId);
        return redirect()->back()->with("success", "Book unliked");
    }
}
