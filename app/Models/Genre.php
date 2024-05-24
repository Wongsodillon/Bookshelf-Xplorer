<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    public function books()
    {
        return $this->belongsToMany(Book::class, 'genre_details', 'genre_id', 'book_id');
    }
}
