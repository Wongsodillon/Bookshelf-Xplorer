<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Book;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userIds = User::pluck('id')->toArray();
        $bookIds = Book::pluck('id')->toArray();

        return [
            'user_id' => $this->faker->randomElement($userIds),
            'book_id' => $this->faker->randomElement($bookIds),
            'rating' => $this->faker->numberBetween(1, 5),
            'review' => $this->faker->paragraphs(1, true),
            'has_spoiler' => $this->faker->boolean(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
