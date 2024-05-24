<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReadBooks extends Model
{
    use HasFactory;

    protected $table = 'read_books';

    public function Book(): BelongsTo
    {
        return $this->belongsTo(Book::class, "book_id");
    }

    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
