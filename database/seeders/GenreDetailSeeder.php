<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "book_id" => 1,
                "genre_id" => 10
            ],
            [
                "book_id" => 1,
                "genre_id" => 5
            ],
            [
                "book_id" => 2,
                "genre_id" => 10
            ],
            [
                "book_id" => 2,
                "genre_id" => 11
            ],
            [
                "book_id" => 3,
                "genre_id" => 6
            ],
            [
                "book_id" => 3,
                "genre_id" => 4
            ],
            [
                "book_id" => 3,
                "genre_id" => 12
            ],
            [
                "book_id" => 4,
                "genre_id" => 10
            ],
            [
                "book_id" => 4,
                "genre_id" => 7
            ],
            [
                "book_id" => 5,
                "genre_id" => 10
            ],
            [
                "book_id" => 5,
                "genre_id" => 4
            ],
            [
                "book_id" => 5,
                "genre_id" => 6
            ],
            [
                "book_id" => 6,
                "genre_id" => 10
            ],
            [
                "book_id" => 6,
                "genre_id" => 12
            ],
            [
                "book_id" => 7,
                "genre_id" => 1
            ],
            [
                "book_id" => 7,
                "genre_id" => 2
            ],
            [
                "book_id" => 7,
                "genre_id" => 13
            ],
            [
                "book_id" => 8,
                "genre_id" => 14
            ],
            [
                "book_id" => 9,
                "genre_id" => 10
            ],
            [
                "book_id" => 9,
                "genre_id" => 1
            ],
            [
                "book_id" => 9,
                "genre_id" => 13
            ],
            [
                "book_id" => 10,
                "genre_id" => 10
            ],
            [
                "book_id" => 10,
                "genre_id" => 15
            ],
            [
                "book_id" => 10,
                "genre_id" => 11
            ],
            [
                "book_id" => 11,
                "genre_id" => 10
            ],
            [
                "book_id" => 11,
                "genre_id" => 3
            ],
            [
                "book_id" => 12,
                "genre_id" => 10
            ],
            [
                "book_id" => 12,
                "genre_id" => 3
            ],
            [
                "book_id" => 13,
                "genre_id" => 3
            ],
            [
                "book_id" => 14,
                "genre_id" => 9
            ],
            [
                "book_id" => 14,
                "genre_id" => 10
            ],
            [
                "book_id" => 15,
                "genre_id" => 10
            ],
            [
                "book_id" => 15,
                "genre_id" => 7
            ],
            [
                "book_id" => 16,
                "genre_id" => 10
            ],
            [
                "book_id" => 16,
                "genre_id" => 4
            ],
            [
                "book_id" => 16,
                "genre_id" => 16
            ],
            [
                "book_id" => 17,
                "genre_id" => 10
            ],
            [
                "book_id" => 17,
                "genre_id" => 16
            ],
            [
                "book_id" => 17,
                "genre_id" => 11
            ],
            [
                "book_id" => 18,
                "genre_id" => 10
            ],
            [
                "book_id" => 18,
                "genre_id" => 6
            ],
            [
                "book_id" => 18,
                "genre_id" => 13
            ],
            [
                "book_id" => 19,
                "genre_id" => 10
            ],
            [
                "book_id" => 19,
                "genre_id" => 4
            ],
            [
                "book_id" => 19,
                "genre_id" => 6
            ],
            [
                "book_id" => 19,
                "genre_id" => 13
            ],
            [
                "book_id" => 20,
                "genre_id" => 10
            ],
            [
                "book_id" => 20,
                "genre_id" => 1
            ],
            [
                "book_id" => 21,
                "genre_id" => 10
            ],
            [
                "book_id" => 21,
                "genre_id" => 8
            ],
            [
                "book_id" => 22,
                "genre_id" => 10
            ],
            [
                "book_id" => 22,
                "genre_id" => 8
            ],
            [
                "book_id" => 23,
                "genre_id" => 10
            ],
            [
                "book_id" => 23,
                "genre_id" => 15
            ],
            [
                "book_id" => 23,
                "genre_id" => 11
            ],
            [
                "book_id" => 24,
                "genre_id" => 10
            ],
            [
                "book_id" => 24,
                "genre_id" => 11
            ],
            [
                "book_id" => 25,
                "genre_id" => 10
            ],
            [
                "book_id" => 25,
                "genre_id" => 1
            ],
            [
                "book_id" => 26,
                "genre_id" => 14
            ],
            [
                "book_id" => 27,
                "genre_id" => 4
            ],
            [
                "book_id" => 27,
                "genre_id" => 5
            ],
            [
                "book_id" => 27,
                "genre_id" => 6
            ],
            [
                "book_id" => 28,
                "genre_id" => 1
            ],
            [
                "book_id" => 28,
                "genre_id" => 5
            ],
            [
                "book_id" => 28,
                "genre_id" => 8
            ],
            [
                "book_id" => 29,
                "genre_id" => 1
            ],
            [
                "book_id" => 29,
                "genre_id" => 13
            ],
            [
                "book_id" => 30,
                "genre_id" => 10
            ],
            [
                "book_id" => 30,
                "genre_id" => 16
            ],
            [
                "book_id" => 31,
                "genre_id" => 2
            ],
            [
                "book_id" => 32,
                "genre_id" => 6,
            ],
            [
                "book_id" => 32,
                "genre_id" => 12,
            ],
            [
                "book_id" => 32,
                "genre_id" => 16
            ],
            [
                "book_id" => 33,
                "genre_id" => 10
            ],
            [
                "book_id" => 33,
                "genre_id" => 5
            ],
            [
                "book_id" => 33,
                "genre_id" => 16
            ],
            [
                "book_id" => 34,
                "genre_id" => 10,
            ],
            [
                "book_id" => 34,
                'genre_id' => 13
            ],
            [
                "book_id" => 34,
                "genre_id" => 16
            ],
            [
                "book_id" => 35,
                "genre_id" => 8
            ],
            [
                "book_id" => 35,
                "genre_id" => 1
            ],
            [
                "book_id" => 36,
                "genre_id" => 10
            ],
            [
                "book_id" => 36,
                "genre_id" => 11
            ],
            [
                "book_id" => 36,
                "genre_id" => 15
            ],
        ];
        DB::table("genre_details")->insert($data);
    }
}
