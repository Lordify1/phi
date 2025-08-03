<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NewsLetter extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $table = "newsletters";

    protected $fillable = [
        'title',
        'subject',
        'content',
        'status',
        'scheduled_date',
        'images',
        'attachments',
        'deleted_at'
    ];

    public static function deletedItems()
    {
        return self::onlyTrashed()->get();
    }
}
