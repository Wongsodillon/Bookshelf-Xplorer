<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'status',
        'about',
        'profile_pic_url'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function recentlyViewed(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'recently_viewed', 'user_id', 'book_id')->withTimestamps();
    }
    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'likes', 'user_id', 'book_id')->withTimestamps();
    }
    public function ratings(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'ratings', 'user_id', 'book_id')->withPivot('rating')->withTimestamps();
    }
    public function readList(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'readlist', 'user_id', 'book_id')->withTimestamps();
    }
    public function readBooks(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'read_books', 'user_id', 'book_id')->withTimestamps();
    }
    public function reviews(): HasMany
    {
        return $this->HasMany(Rating::class, 'user_id')->with('book');
    }
    public function bookReview(): HasMany
    {
        return $this->HasMany(Rating::class, 'book_id')->where('user_id', auth()->id());
    }
    public function LikedLists(): HasMany
    {
        return $this->HasMany(LikedLists::class, 'user_id')->withTimestamps();
    }
    public function LikedReviews(): HasMany
    {
        return $this->HasMany(LikedReviews::class, 'user_id')->withTimestamps();
    }
    public function Lists(): HasMany
    {
        return $this->HasMany(Lists::class, 'user_id');
    }
    public function Following(): HasMany
    {
        return $this->HasMany(Following::class, 'follower_id');
    }
    public function Followers(): HasMany
    {
        return $this->HasMany(Following::class, 'following_id');
    }
}
