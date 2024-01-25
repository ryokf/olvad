<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Outcome\OutcomeBuyResource;
use App\Http\Resources\Outcome\outcomeSocialResource;
use App\Models\Outcome;
use App\Models\OutcomeBuy;
use App\Models\OutcomeSocial;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OutcomeController extends Controller
{
    public function index(OutcomeBuy $outcomeBuy, OutcomeSocial $outcomeSocial)
    {
        $outcomeBuys = $outcomeBuy->with('outcome')->with('store')->get();
        $outcomeSocials = $outcomeSocial->with('outcome')->with('customer')->get();

        $data = [
            'outcomeBuys' => OutcomeBuyResource::collection($outcomeBuys),
            'outcomeSocials' => outcomeSocialResource::collection($outcomeSocials),
        ];

        return Inertia::render('Admin/Outcome/Index', compact('data'));
    }
}
