<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OutcomeBuy>
 */
class OutcomeBuyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'outcome_id' => $this->faker->unique()->numberBetween(1, 20),
            'store_id' => fake()->numberBetween(1, 5),
            'reciepe' => fake()->imageUrl(640, 480, 'animals', true),
        ];
    }
}
