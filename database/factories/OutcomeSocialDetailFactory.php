<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OutcomeSocialDetail>
 */
class OutcomeSocialDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'outcome_detail_id' => fake()->unique()->numberBetween(71, 100),
            'outcome_social_id' => fake()->numberBetween(1, 10),
            'variant_product_id' => $this->faker->numberBetween(1, 10),
            'product_type' => $this->faker->randomElement(['flavor', 'size']),
        ];
    }
}
