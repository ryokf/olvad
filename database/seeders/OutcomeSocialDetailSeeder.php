<?php

namespace Database\Seeders;

use App\Models\OutcomeSocialDetail;
use Illuminate\Database\Seeder;

class OutcomeSocialDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OutcomeSocialDetail::factory()
            ->count(30)
            ->create();
    }
}
