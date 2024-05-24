<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Following extends Model
{
    use HasFactory;
    protected $table = 'following';

    public function Follower()
    {
        return $this->belongsTo(User::class, 'follower_id');
    }

    public function Following()
    {
        return $this->belongsTo(User::class, 'following_id');
    }

}
