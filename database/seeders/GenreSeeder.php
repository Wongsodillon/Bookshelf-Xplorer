<?php

namespace Database\Seeders;

use App\Models\Genre;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Inserting genre with ID 1
        Genre::insert([
            'genre_name' => "Fantasy",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 2
        Genre::insert([
            'genre_name' => "Epic",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 3
        Genre::insert([
            'genre_name' => "Philosophy",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 4
        Genre::insert([
            'genre_name' => "Dystopian",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 5
        Genre::insert([
            'genre_name' => "Tragedy",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 6
        Genre::insert([
            'genre_name' => "Science Fiction",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 7
        Genre::insert([
            'genre_name' => "Thriller",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 8
        Genre::insert([
            'genre_name' => "Horror",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 9
        Genre::insert([
            'genre_name' => "Romance",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 10
        Genre::insert([
            'genre_name' => "Novel",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);


        // Inserting genre with ID 11
        Genre::insert([
            'genre_name' => "Mystery",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 12
        Genre::insert([
            'genre_name' => "Political Fiction",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 13
        Genre::insert([
            'genre_name' => "Adventure",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 14
        Genre::insert([
            'genre_name' => "Non-Fiction",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 15
        Genre::insert([
            'genre_name' => "Crime",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Inserting genre with ID 16
        Genre::insert([
            'genre_name' => "Satire",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

    }
}
