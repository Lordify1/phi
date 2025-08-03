<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Startup extends Model
{
    protected $fillable = [
        "user_id",
        "name",
        "founder",
        "slug",
        "industry",
        "short_pitch",
        "logo",
        "likes_count",
        "comments_count",
        "views_count",
        "rating",
        "problem",
        "solution",
        "target_market",
        "business_model",
        "traction",
        "team_overview",
        "financials_summary",
        "tech_stack",
        "stage",
        "status",
        "launch_date",
        "featured",
    ];
}
