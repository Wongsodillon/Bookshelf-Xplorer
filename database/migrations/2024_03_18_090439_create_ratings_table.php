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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("book_id");
            $table->float("rating")->nullable();
            $table->text('review')->nullable();
            $table->boolean('has_spoiler')->default(false);
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("book_id")->references("id")->on("books")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
