<?php

namespace Database\Seeders;

use App\Models\Publisher;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PublisherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Publisher::insert([
            'publisher_name' => "Crown Publishing Group",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        Publisher::insert([
            'publisher_name' => "Gramedia Pustaka Utama",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        Publisher::insert([
            'publisher_name' => "Penguin Random House",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        Publisher::insert([
            'publisher_name' => "Harper Collins",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        Publisher::insert([
            'publisher_name' => "Macmillan",
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
