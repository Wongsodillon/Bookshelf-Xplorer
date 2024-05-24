<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Book;
use App\Models\Following;
use App\Models\Genre;
use Database\Factories\ListFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(GenreSeeder::class);
        $this->call(PublisherSeeder::class);
        $this->call(BookSeeder::class);
        $this->call(GenreDetailSeeder::class);
        $this->call(RecentlyViewedSeeder::class);
        $this->call(RatingSeeder::class);
        $this->call(LikesSeeder::class);
        $this->call(ReadListSeeder::class);
        $this->call(ListSeeder::class);
        $this->call(FollowingSeeder::class);
    }
}
