<?php

namespace Database\Seeders;

use App\Models\OutcomeBuy;
use Illuminate\Database\Seeder;

class OutcomeBuySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OutcomeBuy::factory()
            ->count(20)
            ->create();
    }
}
