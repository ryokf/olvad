<?php

namespace Database\Seeders;

use App\Models\ProductFlavor;
use Illuminate\Database\Seeder;

class ProductFlavorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductFlavor::factory()
            ->count(10)
            ->create();
    }
}
