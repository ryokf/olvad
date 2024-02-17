<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'category_id' => fake()->numberBetween(1, 2),
            'description' => fake()->paragraph(),
            'image' => fake()->imageUrl(640, 480, 'animals', true),
        ];
    }
}
