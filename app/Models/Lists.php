<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Lists extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'description', 'is_public'];

    protected $table = 'lists';

    public function User(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }
    public function ListDetails(): HasMany
    {
        return $this->hasMany(ListDetails::class, 'list_id')->orderBy('order');
    }
    public function LikedLists(): HasMany
    {
        return $this->hasMany(LikedLists::class, 'list_id');
    }
    public function UserLike(): HasOne
    {
        return $this->hasOne(LikedLists::class, 'list_id')->where('user_id', auth()->id());
    }
}
