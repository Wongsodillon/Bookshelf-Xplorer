<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Lists;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ListDetailsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $listIds = Lists::pluck('id')->toArray();
        $bookIds = Book::pluck('id')->toArray();
        return [
            'list_id' => $this->faker->randomElement($listIds),
            'book_id' => $this->faker->randomElement($bookIds),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
