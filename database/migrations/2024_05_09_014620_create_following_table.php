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
        Schema::create('following', function (Blueprint $table) {
            $table->unsignedBigInteger('follower_id');
            $table->unsignedBigInteger('following_id');
            $table->timestamps();
            $table->foreign('follower_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('following_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->primary(['follower_id', 'following_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('following');
    }
};
