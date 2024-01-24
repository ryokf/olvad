<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OutcomeSocial>
 */
class OutcomeSocialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'outcome_id' => fake()->unique()->numberBetween(21, 30),
            'customer_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
