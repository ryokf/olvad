<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OutcomeBuyDetail>
 */
class OutcomeBuyDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'outcome_detail_id' => fake()->numberBetween(1,70),
            'outcome_buy_id' => fake()->numberBetween(1,20),
            'ingredient_id' => fake()->numberBetween(1,20)
        ];
    }
}
