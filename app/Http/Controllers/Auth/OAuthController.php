<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    public function Redirect() {
        return Socialite::driver('google')->redirect();
    }

    public function Callback() {
        $googleUser = Socialite::driver('google')->user();
        $user = User::where('email', $googleUser->email)->first();
        if ($user) {
            Auth::login($user);
            return redirect()->route('dashboard');
        }
        $newUser = User::create([
            'name' => $googleUser->name,
            'username' => $googleUser->id,
            'email' => $googleUser->email,
            'password' => bcrypt('password'),
            'profile_pic_url' => $googleUser->avatar,
            'about' => '',
            'status' => true,
        ]);
        Auth::login($newUser);
        return redirect()->route('dashboard');
    }
}
