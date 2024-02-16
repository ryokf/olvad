<?php

namespace Database\Seeders;

use App\Models\OutcomeBuyDetail;
use Illuminate\Database\Seeder;

class OutcomeBuyDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OutcomeBuyDetail::factory()
            ->count(70)
            ->create();
    }
}
