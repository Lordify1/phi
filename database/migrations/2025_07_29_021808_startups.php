<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('startups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();

            $table->string('name');
            $table->string('founder');
            $table->string('slug')->unique();
            $table->string('industry')->nullable();
            $table->string('short_pitch', 255)->nullable();
            $table->string('logo')->nullable();

            // Engagement
            $table->unsignedInteger('likes_count')->default(0);
            $table->unsignedInteger('comments_count')->default(0);
            $table->unsignedInteger('views_count')->default(0);
            $table->float('rating')->default(0);

            // AI Extracted Fields
            $table->text('problem')->nullable();
            $table->text('solution')->nullable();
            $table->text('target_market')->nullable();
            $table->text('business_model')->nullable();
            $table->text('traction')->nullable();
            $table->text('team_overview')->nullable();
            $table->text('financials_summary')->nullable();
            $table->text('tech_stack')->nullable();
            $table->string('stage')->nullable();

            // Meta
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->enum('quality_status', ['VERIFIED','PENDING','REJECTED'])->default('PENDING');
            $table->timestamp('launch_date')->nullable();
            $table->boolean('featured')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('startups');
    }
};
