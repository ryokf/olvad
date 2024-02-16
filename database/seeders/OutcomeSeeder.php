<?php

namespace Database\Seeders;

use App\Models\Outcome;
use Illuminate\Database\Seeder;

class OutcomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Outcome::factory()
            ->count(30)
            ->create();
    }
}
