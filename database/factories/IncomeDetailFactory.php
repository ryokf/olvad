<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IncomeDetail>
 */
class IncomeDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'income_id' => $this->faker->numberBetween(1, 40),
            'product_id' => $this->faker->numberBetween(1, 10),
            'amount' => $this->faker->numberBetween(1, 20),
            'variant_product_id' => $this->faker->numberBetween(1, 10),
            'product_type' => $this->faker->randomElement(['flavor', 'size']),
        ];
    }
}
