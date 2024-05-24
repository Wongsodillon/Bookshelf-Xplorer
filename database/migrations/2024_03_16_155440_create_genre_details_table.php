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
        Schema::create('genre_details', function (Blueprint $table) {
            $table->unsignedBigInteger("book_id");
            $table->unsignedBigInteger("genre_id");
            $table->primary(["book_id", "genre_id"]);
            $table->foreign("book_id")->references("id")->on("books")->onDelete("cascade")->onUpdate("cascade");
            $table->foreign("genre_id")->references("id")->on("genres")->onDelete("cascade")->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('genre_details');
    }
};
