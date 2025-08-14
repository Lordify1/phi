<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('newsletters', function(Blueprint $table){
            $table->id();
            $table->string('title');
            $table->string('subject');
            $table->text('content');
            $table->enum('type', ['welcome','unsubscribe','normal'])->default('normal');
            $table->enum('status', ['draft','schedule','sent'])->default('draft');
            $table->timestamp('schedule_date')->nullable();
            $table->json('images')->nullable();
            $table->json('attachments')->nullable();
            $table->bigInteger('send_count')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newsletters');
    }
};
