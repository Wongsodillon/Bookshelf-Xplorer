<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\Following;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FollowingController extends Controller
{
    public function FollowUser(Request $request) {
        $followerId = Auth::id();
        $followingId = $request->input('id');
        $newFollower = new Following();
        $newFollower->follower_id = $followerId;
        $newFollower->following_id = $followingId;
        $newFollower->save();
        return redirect()->back();
    }

    public function UnfollowUser(Request $request) {
        $followerId = Auth::id();
        $followingId = $request->input('id');
        Following::where('follower_id', $followerId)->where('following_id', $followingId)->delete();
        return redirect()->back();
    }

    public function GetFollowing(Request $request) {
        $user = RegisteredUserController::GetUserProfile($request->username);
        $following = Following::where('follower_id', $user->id)->with('Following')->get();
        return $following->pluck('following');
    }

    public function GetFollowers(Request $request) {
        $user = RegisteredUserController::GetUserProfile($request->username);
        $followers = Following::where('following_id', $user->id)->with('Follower')->get();
        return $followers->pluck('follower');
    }

}
