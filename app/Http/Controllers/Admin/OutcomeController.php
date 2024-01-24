<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Outcome;
use App\Models\OutcomeBuy;
use App\Models\OutcomeSocial;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OutcomeController extends Controller
{
    public function index(OutcomeBuy $outcomeBuy, Product $product, Outcome $outcome, OutcomeSocial $outcomeSocial)
    {
        $outcomeBuys = $outcomeBuy->with('outcome')->get();
        $outcomeSocials = $outcomeSocial->with('outcome')->get();

        $data = [
            'outcomeBuys' => $outcomeBuys,
            'outcomeSocials' => $outcomeSocials,
        ];

        return Inertia::render('Admin/Outcome/Index', compact('data'));
    }
}
