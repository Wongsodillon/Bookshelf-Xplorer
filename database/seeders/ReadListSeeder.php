<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReadListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "user_id" => 1,
                "book_id" => 2,
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
                "book_id" => 16,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 4,
                "book_id" => 15,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 3,
                "book_id" => 17,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 2,
                "book_id" => 15,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 7,
                "book_id" => 13,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 3,
                "book_id" => 25,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 5,
                "book_id" => 13,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 22,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 10,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 4,
                "book_id" => 22,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 8,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 6,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 20,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "user_id" => 1,
                "book_id" => 16,
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ];

        DB::table('readlist')->insert($data);
    }
}
