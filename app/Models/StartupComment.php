<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StartupComment extends Model
{
    protected $table = 'startup_comments';

    protected $fillable = [
	    "sender_id",
		"responder_id",
	    "parent_message_id",
	    "startup_id",
	    "comment"
    ];
}
