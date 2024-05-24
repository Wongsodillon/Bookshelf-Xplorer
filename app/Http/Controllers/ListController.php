<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\LikedLists;
use App\Models\ListDetails;
use App\Models\Lists;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ListController extends Controller
{

    public function GetLists() {
        $topPicks = Lists::with(['ListDetails.Book', 'User'])
            ->where('is_public', 1)
            ->where('user_id', '!=', Auth::id())
            ->withCount('LikedLists')
            ->orderBy('created_at', 'asc')
            ->limit(3)->get();
        return Inertia::render('ListsPage', [
            'topPicks' => $topPicks,
        ]);
    }

    public function GetMyLists(Request $request) {
        $user = RegisteredUserController::GetUserProfile($request->username);
        if (!$user) {
            return redirect()->route('dashboard');
        }
        $userId = $user->id;
        $lists = Lists::with(['ListDetails.Book', 'User'])
            ->withCount('LikedLists')
            ->where('user_id', $userId)
            ->get();
        if ($userId != Auth::id()) {
            $lists = $lists->where('is_public', 1);
        }
        return Inertia::render('Profile/MyLists', ['lists' => $lists, 'user' => $user]);
    }

    public function ListDetails(Request $request) {
        $listId = $request->route('id');
        $list = Lists::with(['ListDetails', "User", 'UserLike'])
            ->withCount('LikedLists')
            ->where('id', $listId)->first();
        if ($list->is_public == 0 && $list->user_id != Auth::id()) {
            return redirect()->route('lists.index');
        }
        $books = ListDetails::with(['Book.genres', 'Book.userLike'])->where('list_id', $listId)->orderBy('order')->get();
        return Inertia::render('ListDetail', ['list' => $list, 'books' => $books]);
    }

    public function EditList(Request $request) {
        $listId = $request->route('id');
        $list = Lists::with(['ListDetails'])->where('id', $listId)->first();
        $books = ListDetails::with('Book.userRating')->where('list_id', $listId)->orderBy('order')->get();
        if (!$list) {
            return redirect()->route('my-lists.index');
        }
        $user = RegisteredUserController::GetUserByID($list->user_id);
        return Inertia::render('Profile/EditList', ['list' => $list, 'books' => $books, 'user' => $user]);
    }

    public function CreateList(Request $request) {
        $list = new Lists();

        if ($request->input('list_name') == null) {
            return back()->withErrors(['list_name' => 'List name is required']);
        }

        $list->list_name = $request->input('list_name');
        $list->list_description = $request->input('list_description');
        $list->is_public = $request->input('list_is_public');
        $userId = Auth::id();
        $list->user_id = $userId;
        $list->save();
        return redirect()->route('my-lists.index', ['username' => Auth::user()->username]);
    }

    public function UpdateList(Request $request) {
        $listId = $request->input('list_id');
        $list = Lists::find($listId);
        if (!$list) {
            return redirect()->route('my-lists.index');
        }
        $list->list_name = $request->input('list_name');
        $list->list_description = $request->input('list_description');
        $list->is_public = $request->input('list_is_public');

        $booksToDelete = ListDetails::where('list_id', $listId);
        $booksToDelete->delete();

        $orders = 1;
        $booksToInsert = $request->list_books;
        foreach ($booksToInsert as $book) {
            $listDetails = new ListDetails();
            $listDetails->list_id = $listId;
            $listDetails->book_id = $book['book_id'];
            $listDetails->order = $orders;
            $orders++;
            $listDetails->created_at = now();
            $listDetails->updated_at = now();
            $listDetails->save();
        }

        $list->save();
        return redirect()->route('my-lists.index', ['username' => Auth::user()->username]);
    }

    public function DeleteList(Request $request) {
        $listId = $request->input('list_id');
        $list = Lists::find($listId);
        if (!$list) {
            return redirect()->route('my-lists.index');
        }
        $list->delete();
        return redirect()->route('my-lists.index', ['username' => Auth::user()->username]);
    }

    public function AddToList(Request $request) {
        $listId = $request->input('list_id');
        $bookId = $request->input('book_id');
        $order = ListDetails::where('list_id', $listId)->count() + 1;

        if (ListDetails::where('list_id', $listId)->where('book_id', $bookId)->exists()) {
            return redirect()->back()->withErrors(['book_id' => 'Book already exists in list']);
        }

        $listDetails = new ListDetails();
        $listDetails->list_id = $listId;
        $listDetails->book_id = $bookId;
        $listDetails->order = $order;
        $listDetails->save();
        return redirect()->back();
    }

    public function GetLikedLists(Request $request) {
        $user = RegisteredUserController::GetUserProfile($request->username);
        if (!$user) {
            return redirect()->route('dashboard');
        }
        $userId = $user->id;
        $likedListIds = LikedLists::where('user_id', $userId)->pluck('list_id');
        $lists = Lists::with(['ListDetails.Book', 'User'])
            ->whereIn('id', $likedListIds)
            ->where('is_public', 1)
            ->withCount('LikedLists')
            ->get();
        return Inertia::render('Profile/LikedLists', [
            'lists' => $lists,
            'user' => $user
        ]);
    }
}
