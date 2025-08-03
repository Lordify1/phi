<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsletterSubscriber extends Model
{
    protected $table = 'newsletter_subscribers';

    protected $fillable = [
        'name',
        'email',
        'why',
        'status'
    ];

    public static function subscribed()
    {
        return self::where('status','subscribed')->get();
    }
}
