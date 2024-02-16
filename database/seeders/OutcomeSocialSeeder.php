<?php

namespace Database\Seeders;

use App\Models\OutcomeSocial;
use Illuminate\Database\Seeder;

class OutcomeSocialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OutcomeSocial::factory()
            ->count(10)
            ->create();
    }
}
