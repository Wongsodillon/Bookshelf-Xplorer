<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ListDetails extends Model
{
    use HasFactory;

    protected $fillable = ['list_id', 'book_id', 'created_at', 'updated_at'];

    public function Book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id', 'id');
    }

    public function List(): BelongsTo
    {
        return $this->belongsTo(Lists::class, 'list_id');
    }


}
