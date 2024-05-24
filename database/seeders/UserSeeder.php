<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data =[
            [
                'username' => "wongsodillon",
                "name" => "Dillon Wongso",
                "email" => "wongsodillon@gmail.com",
                'email_verified_at' => now(),
                "password" => Hash::make("wongsodillon@gmail.com"),
                "profile_pic_url" => "/storage/profile-pic/1.jpg",
                "status" => true,
                'about' => 'I am a software engineer who loves to code and play games. I am also a big fan of anime and manga. I am currently working at a startup company in Jakarta. I am also a part-time lecturer at a university in Jakarta. I am also a part-time content creator on YouTube. I am also a part-time writer on Medium.',
                'remember_token' => Str::random(10),
                "role" => 'user'
            ],
            [
                'username' => "erictianto",
                "name" => "Eric Tianto",
                "email" => "erictianto@gmail.com",
                'email_verified_at' => now(),
                "password" => Hash::make("erictianto@gmail.com"),
                "profile_pic_url" => "/storage/profile-pic/2.jpg",
                "status" => true,
                'about' => 'I am a software engineer who loves to code and play games. I am also a big fan of anime and manga. I am currently working at a startup company in Jakarta. I am also a part-time lecturer at a university in Jakarta. I am also a part-time content creator on YouTube. I am also a part-time writer on Medium.',
                'remember_token' => Str::random(10),
                "role" => 'user'
            ],
            [
                'username' => "aldendarmawan",
                "name" => "Alden Darmawan Ho",
                "email" => "aldendarmawan@gmail.com",
                'email_verified_at' => now(),
                "password" => Hash::make("aldendarmawan@gmail.com"),
                "profile_pic_url" => null,
                "status" => false,
                'about' => 'I am a software engineer who loves to code and play games. I am also a big fan of anime and manga. I am currently working at a startup company in Jakarta. I am also a part-time lecturer at a university in Jakarta. I am also a part-time content creator on YouTube. I am also a part-time writer on Medium.',
                'remember_token' => Str::random(10),
                "role" => 'user'
            ],
            [
                'username' => "admin",
                "name" => "Admin",
                "email" => "admin@gmail.com",
                'email_verified_at' => now(),
                "password" => Hash::make("admin"),
                "profile_pic_url" => null,
                "status" => true,
                'about' => 'I am a software engineer who loves to code and play games. I am also a big fan of anime and manga. I am currently working at a startup company in Jakarta. I am also a part-time lecturer at a university in Jakarta. I am also a part-time content creator on YouTube. I am also a part-time writer on Medium.',
                'remember_token' => Str::random(10),
                'role' => "admin"
            ]
        ];
        DB::table('users')->insert($data);
        User::factory()->times(40)->create();
    }
}
