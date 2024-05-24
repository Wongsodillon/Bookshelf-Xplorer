<?php

namespace App\Http\Controllers;

use App\Models\LikedReviews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikedReviewsController extends Controller
{
    public function LikeReview(Request $request) {
        $reviewId = $request->input('review_id');
        $userId = Auth::id();
        $likedReview = new LikedReviews();
        $likedReview->review_id = $reviewId;
        $likedReview->user_id = $userId;
        $likedReview->save();
        return redirect()->back();
    }

    public function UnlikeReview(Request $request) {
        $reviewId = $request->input('review_id');
        $userId = Auth::id();
        LikedReviews::where('review_id', $reviewId)->where('user_id', $userId)->delete();
        
        return redirect()->back();
    }
}
