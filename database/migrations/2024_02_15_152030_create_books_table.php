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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('book_title');
            $table->string('book_author');
            $table->string('book_cover_url');
            $table->string('book_description', 1000);
            $table->date('book_publish_date');
            $table->unsignedBigInteger('book_page');
            $table->unsignedBigInteger('publisher_id');
            $table->foreign('publisher_id')->references("id")->on("publishers")->onDelete('cascade')->onUpdate('cascade');
            // $table->foreignId('publisher_id')->constrained('publishers')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
