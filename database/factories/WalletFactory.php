<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wallet>
 */
class WalletFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'balance' => fake()->numberBetween(100, 10000) * 1000,
            'income' => fake()->numberBetween(100, 10000) * 1000,
            'outcome' => fake()->numberBetween(100, 10000) * 1000,
            'profit' => fake()->numberBetween(100, 10000) * 1000,
            'description' => fake()->sentence(),
        ];
    }
}
