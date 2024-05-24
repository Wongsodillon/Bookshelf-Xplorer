<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\Book;
use App\Models\Likes;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\BookController;
use App\Models\Genre;
use App\Models\Publisher;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;

class ProfileController extends Controller
{

    function GetReadBooks(Request $request) {
        $controller = new ReadBooksController();
        $user = RegisteredUserController::GetUserProfile($request->username);
        $books = $controller->GetReadBooks($user->id);
        $genres = Genre::all();
        $publishers = Publisher::all();
        return Inertia::render('Profile/ReadBooks', [
            'books' => $books,
            'genres' => $genres,
            'publishers' => $publishers,
            'user' => $user
        ]);
    }

    public function liked() {
        return Inertia::render('Profile/LikedReviews');
    }

    public function UserProfile(Request $request) {
        $user = RegisteredUserController::GetUserProfile($request->username);
        if (!$user) {
            return redirect()->route('dashboard');
        }
        $userId = $user->id;
        $recentlyLiked = Book::with(['likes', 'genres'])
        ->whereHas('likes', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->latest()->limit(7)->get();
        $readList = Book::with(['readList'])->whereHas('readlist', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->limit(4)->get()->sortByDesc("created_at");
        $ratings = Rating::where('user_id', $userId)->select('rating')->groupBy('rating')->selectRaw('rating, COUNT(rating) as ratingCount')->get();
        return Inertia::render('Profile/Profile', [
            'recentlyLiked' => $recentlyLiked,
            'readList' => $readList,
            'ratings' => $ratings,
            'user' => $user
        ]);
    }

}
