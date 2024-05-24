<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedLists extends Model
{
    use HasFactory;

    protected $table = 'saved_lists';

    public function List()
    {
        $this->belongsTo(Lists::class);
    }
    public function User()
    {
        $this->belongsTo(User::class);
    }
}
