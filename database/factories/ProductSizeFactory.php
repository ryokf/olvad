<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductSize>
 */
class ProductSizeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => fake()->numberBetween(6, 10),
            'size' => fake()->numberBetween(10, 25).' x '.fake()->numberBetween(10, 25),
            'price' => fake()->numberBetween(5, 50) * 1000,
        ];
    }
}
