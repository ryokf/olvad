<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Outcome\ProductFlavorResource;
use App\Http\Resources\Outcome\ProductSizeResource;
// use App\Http\Resources\Product\ProductResource;
use App\Models\Customer;
use App\Models\Ingredient;
use App\Models\Outcome;
use App\Models\OutcomeBuy;
use App\Models\OutcomeDetail;
use App\Models\OutcomeSocial;
use App\Models\ProductFlavor;
use App\Models\ProductSize;
use App\Models\Store;
use App\Models\Unit;
use App\Services\Admin\OutcomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class OutcomeController extends Controller
{
    private $outcomeService;

    public function __construct(OutcomeService $outcomeService)
    {
        $this->outcomeService = $outcomeService;
    }

    public function index(
        Request $request,
        OutcomeBuy $outcomeBuy,
        OutcomeSocial $outcomeSocial,
        Store $store,
        Ingredient $ingredient,
        Unit $unit,
        ProductFlavor $productFlavor,
        ProductSize $productSize,
        Customer $customer
    ) {
        $outcomeData = $this->outcomeService->getData($request, $outcomeBuy, $outcomeSocial);
        $store = $store->where('is_archived', false)->get();
        $ingredient = $ingredient->where('is_archived', false)->get();
        $unit = $unit->get();
        $productFlavor = ProductFlavorResource::collection($productFlavor->where('is_archived', false)->with('product')->get(), true); // $productFlavor->get();
        $productSize = ProductSizeResource::collection($productSize->where('is_archived', false)->with('product')->get(), false); // $productFlavor->get();
        $customer = $customer->where('is_archived', false)->get();

        $product = Arr::flatten([Arr::flatten($productFlavor), Arr::flatten($productSize)]);
        $product = collect($product)->sortBy('product.name')->values()->all();

        return Inertia::render('Admin/Outcome/index', compact('outcomeData', 'store', 'ingredient', 'unit', 'product', 'productSize', 'customer'));
    }

    public function store(Request $request, Outcome $outcome, OutcomeDetail $outcomeDetail, OutcomeBuy $outcomeBuy, OutcomeSocial $outcomeSocial)
    {
        // return $request;

        $request->validate([
            'type' => 'required',
            'description' => 'required',
            'reciepe' => $request->type == 'buy' ? 'required' : '',
        ]);

        if ($request->type == 'buy') {
            $this->outcomeService->storeBuy($request, $outcome, $outcomeBuy, $outcomeDetail);
        } elseif ($request->type == 'social') {
            $this->outcomeService->storeSocial($request, $outcome, $outcomeSocial, $outcomeDetail);
        } else {
            return 'data tidak valid';
        }

        return redirect()->back()->with('message', 'Pengeluaran Berhasil ditambahkan');
    }

    public function destroy(Request $request, Outcome $outcome)
    {
        $this->outcomeService->destroy($request, $outcome);

        return redirect()->back()->with('message', 'Pengeluaran Berhasil dihpaus');
    }
}
