<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecentlyViewedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "user_id" => 1,
                "book_id" => 1,
                "created_at" => now(),
                "updated_at" => now()
            ],
            [
                "user_id" => 1,
                "book_id" => 17,
                "created_at" => now(),
                "updated_at" => now()
            ],
            [
                "user_id" => 2,
                "book_id" => 16,
                "created_at" => now(),
                "updated_at" => now()
            ],
        ];

        DB::table('recently_viewed')->insert($data);
    }
}
