<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikedReviews extends Model
{
    use HasFactory;

    public function User() {
        return $this->belongsTo(User::class);
    }
    public function Review() {
        return $this->belongsTo(Rating::class);
    }
}
