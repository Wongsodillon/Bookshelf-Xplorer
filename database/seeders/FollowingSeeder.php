<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FollowingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'follower_id' => 1,
                'following_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 1,
                'following_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 1,
                'following_id' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 1,
                'following_id' => 5,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 1,
                'following_id' => 6,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 2,
                'following_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 2,
                'following_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 2,
                'following_id' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 12,
                'following_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 13,
                'following_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 14,
                'following_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 15,
                'following_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'follower_id' => 15,
                'following_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];
        DB::table('following')->insert($data);
    }
}
