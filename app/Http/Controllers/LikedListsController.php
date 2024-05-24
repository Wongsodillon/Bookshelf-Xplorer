<?php

namespace App\Http\Controllers;

use App\Models\LikedLists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikedListsController extends Controller
{
    public function LikeList(Request $request) {
        $listId = $request->input('list_id');
        $userId = Auth::id();
        $likedList = new LikedLists();
        $likedList->list_id = $listId;
        $likedList->user_id = $userId;
        $likedList->save();
        return redirect()->route('lists.details', ['id' => $listId]);
    }
    public function UnlikeList(Request $request) {
        $listId = $request->input('list_id');
        $userId = Auth::id();
        LikedLists::where('list_id', $listId)->where('user_id', $userId)->delete();
        return redirect()->route('lists.details', ['id' => $listId]);
    }
}
