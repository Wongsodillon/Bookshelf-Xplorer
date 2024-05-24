<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Book extends Model
{
    use HasFactory;

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_details', 'book_id', 'genre_id');
    }

    public function recentlyViewed()
    {
        return $this->belongsToMany(User::class, 'recently_viewed', 'book_id', 'user_id');
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }

    public function ratings(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'ratings', 'book_id', 'user_id')->select('rating')->withTimestamps();
    }
    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'likes', 'book_id', 'user_id')->withTimestamps();
    }
    public function readList(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'readlist', 'book_id', 'user_id')->withTimestamps();
    }
    public function readBooks(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'read_books', 'book_id', 'user_id')->withTimestamps();
    }
    public function rating(): HasOne
    {
        return $this->hasOne(Rating::class, 'book_id');
    }
    public function userReadBook(): HasOne
    {
        return $this->hasOne(ReadBooks::class, 'book_id')->where('user_id', auth()->id());
    }
    public function userRating(): HasOne
    {
        return $this->hasOne(Rating::class, 'book_id')->where('user_id', auth()->id());
    }
    public function userLike(): HasOne
    {
        return $this->hasOne(Likes::class, 'book_id')->where('user_id', auth()->id());
    }
    public function userReadList(): HasOne
    {
        return $this->hasOne(ReadList::class, 'book_id')->where('user_id', auth()->id());
    }
    public function reviews(): HasMany
    {
        return $this->hasMany(Rating::class)->where('review', '!=', null)->with('user');
    }
    public function userReview(): HasOne
    {
        return $this->hasOne(Rating::class)->where('user_id', auth()->id())->where('review', '!=', null);
    }
}
