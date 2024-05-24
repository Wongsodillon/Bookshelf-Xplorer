<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikedLists extends Model
{
    use HasFactory;

    protected $table = 'liked_lists';

    public function List() {
        return $this->belongsTo(Lists::class, 'list_id');
    }
    public function User() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
