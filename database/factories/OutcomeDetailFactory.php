<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OutcomeDetail>
 */
class OutcomeDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'unit_id' => fake()->numberBetween(1,2),
            'amount' => fake()->numberBetween(1,10),
            'price' => fake()->numberBetween(1,50) * 1000,
        ];
    }
}
