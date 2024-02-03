<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Outcome\OutcomeBuyResource;
use App\Http\Resources\Outcome\outcomeSocialResource;
use App\Models\Ingredient;
use App\Models\Outcome;
use App\Models\OutcomeBuy;
use App\Models\OutcomeBuyDetail;
use App\Models\OutcomeDetail;
use App\Models\OutcomeSocial;
use App\Models\Product;
use App\Models\Store;
use App\Models\Unit;
use App\Services\Admin\OutcomeService;
use App\Services\Admin\Outcome\storeOutcomeBuyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OutcomeController extends Controller
{
    private $outcomeService;

    public function __construct(OutcomeService $outcomeService)
    {
        $this->outcomeService = $outcomeService;
    }

    public function index(Request $request,OutcomeBuy $outcomeBuy, OutcomeSocial $outcomeSocial, Store $store, Ingredient $ingredient, Unit $unit)
    {
        $outcomeData = $this->outcomeService->getData($request ,$outcomeBuy, $outcomeSocial);
        $store = $store->get();
        $ingredient = $ingredient->get();
        $unit = $unit->get();

        return Inertia::render('Admin/Outcome/Index', compact('outcomeData', 'store', 'ingredient', 'unit'));
    }

    public function store(Request $request, Outcome $outcome, OutcomeDetail $outcomeDetail, OutcomeBuy $outcomeBuy, OutcomeSocial $outcomeSocial)
    {
        if($request->type == 'buy'){
            $this->outcomeService->storeBuy($request, $outcome,  $outcomeBuy, $outcomeDetail);
        } elseif($request->type == 'social'){
            return $this->outcomeService->storeSocial($request, $outcome,  $outcomeSocial, $outcomeDetail);
        } else {
            return "data tidak valid";
        }

        return redirect()->route('admin.outcome.index');
    }
}
