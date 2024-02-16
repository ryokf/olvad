<?php

namespace Database\Seeders;

use App\Models\OutcomeDetail;
use Illuminate\Database\Seeder;

class OutcomeDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OutcomeDetail::factory()
            ->count(100)
            ->create();
    }
}
