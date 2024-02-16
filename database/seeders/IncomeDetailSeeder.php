<?php

namespace Database\Seeders;

use App\Models\IncomeDetail;
use Illuminate\Database\Seeder;

class IncomeDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        IncomeDetail::factory()
            ->count(120)
            ->create();
    }
}
