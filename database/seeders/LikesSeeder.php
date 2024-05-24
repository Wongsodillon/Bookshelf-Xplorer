<?php

namespace Database\Seeders;

use App\Models\Likes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LikesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "user_id" => 1,
                "book_id" => 4,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 5,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 2,
                "book_id" => 17,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 4,
                "book_id" => 18,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 3,
                "book_id" => 16,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 2,
                "book_id" => 14,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 7,
                "book_id" => 12,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 3,
                "book_id" => 24,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 5,
                "book_id" => 19,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 21,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 9,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 4,
                "book_id" => 21,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 17,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 23,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 25,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 15,
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ];

        $data2 = [
            [
                "user_id" => 1,
                "book_id" => 26,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 2,
                "book_id" => 11,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 2,
                "book_id" => 4,
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ];

        DB::table('likes')->insert($data);
        DB::table('read_books')->insert($data);
        DB::table('read_books')->insert($data2);
    }
}
