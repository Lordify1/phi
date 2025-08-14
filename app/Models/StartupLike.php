<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StartupLike extends Model
{
    protected $fillable = [
        'user_id',
        'guest_id',
        'startup_id'
    ];
}
