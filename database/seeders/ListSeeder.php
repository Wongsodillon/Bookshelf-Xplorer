<?php

namespace Database\Seeders;

use App\Models\ListDetails;
use App\Models\Lists;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data = [
            [
                'user_id' => 1,
                'list_name' => "My Favorites",
                'list_description' => "The best books of 2021",
                'is_public' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'list_name' => "Best Books of 2000s",
                'list_description' => "The best books of 2000s",
                'is_public' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'list_name' => "Eric's Favorites",
                'list_description' => "Precious Eric Tianto Collection",
                'is_public' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'list_name' => "Horror Books",
                'list_description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                'is_public' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'list_name' => "I hate reading",
                'list_description' => "I hate reading",
                'is_public' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'list_name' => "I love reading",
                'list_description' => "I love reading",
                'is_public' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        $details = [
            [
                'list_id' => 1,
                'book_id' => 4,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 1,
                'book_id' => 13,
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 1,
                'book_id' => 15,
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 1,
                'book_id' => 20,
                'order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 1,
                'book_id' => 3,
                'order' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 1,
                'book_id' => 7,
                'order' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 1,
                'book_id' => 9,
                'order' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 2,
                'book_id' => 9,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 2,
                'book_id' => 19,
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 2,
                'book_id' => 18,
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 3,
                'book_id' => 6,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 3,
                'book_id' => 22,
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 3,
                'book_id' => 12,
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 3,
                'book_id' => 13,
                'order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 4,
                'book_id' => 13,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 4,
                'book_id' => 25,
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 4,
                'book_id' => 20,
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 5,
                'book_id' => 11,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 5,
                'book_id' => 21,
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 5,
                'book_id' => 19,
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 6,
                'book_id' => 7,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 6,
                'book_id' => 18,
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table("lists")->insert($data);
        DB::table("list_details")->insert($details);
        Lists::factory(10)->create();
    }
}
