<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    use HasFactory;

    protected $table = 'ratings';

    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function Book(): BelongsTo
    {
        return $this->belongsTo(Book::class, "book_id");
    }

    public function Likes()
    {
        return $this->hasMany(LikedReviews::class, 'review_id', 'id');
    }

    public function Liked()
    {
        return $this->hasOne(LikedReviews::class, 'review_id', 'id')->where('user_id', auth()->id());
    }
}
