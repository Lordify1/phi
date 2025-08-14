<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StartupView extends Model
{
    protected $table = 'startup_views';

    protected $fillable = [
        'user_id',
        'guest_id',
        'startup_id'
    ];
}
