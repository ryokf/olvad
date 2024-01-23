<?php

namespace Database\Seeders;

use App\Models\ProductFlavor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductFlavorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductFlavor::factory()
        ->count(5)
        ->create();
    }
}
