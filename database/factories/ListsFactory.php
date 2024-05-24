<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lists>
 */
class ListsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userIds = User::pluck('id')->toArray();
        return [
            'user_id' => $this->faker->randomElement($userIds),
            'list_name' => $this->faker->sentence(3),
            'list_description' => $this->faker->paragraph(3),
            'is_public' => 1,
        ];
    }
}
