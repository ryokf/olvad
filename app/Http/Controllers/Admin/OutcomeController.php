<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Outcome\OutcomeBuyResource;
use App\Http\Resources\Outcome\outcomeSocialResource;
use App\Models\Customer;
use App\Models\Ingredient;
use App\Models\Outcome;
use App\Models\OutcomeBuy;
use App\Models\OutcomeBuyDetail;
use App\Models\OutcomeDetail;
use App\Models\OutcomeSocial;
use App\Models\Product;
use App\Models\Store;
use App\Models\Unit;
use App\Models\Wallet;
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

    public function index(
        Request $request,
        OutcomeBuy $outcomeBuy,
        OutcomeSocial $outcomeSocial,
        Store $store,
        Ingredient $ingredient,
        Unit $unit,
        Product $product,
        Customer $customer
    ) {
        $outcomeData = $this->outcomeService->getData($request, $outcomeBuy, $outcomeSocial);
        $store = $store->get();
        $ingredient = $ingredient->get();
        $unit = $unit->get();
        $product = $product->get();
        $customer = $customer->get();

        return Inertia::render('Admin/Outcome/Index', compact('outcomeData', 'store', 'ingredient', 'unit', 'product', 'customer'));
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
            $this->outcomeService->storeBuy($request, $outcome,  $outcomeBuy, $outcomeDetail);
        } elseif ($request->type == 'social') {
            $this->outcomeService->storeSocial($request, $outcome,  $outcomeSocial, $outcomeDetail);
        } else {
            return "data tidak valid";
        }

        return redirect()->route('admin.outcome.index.buy');
    }

    public function destroy(Request $request, Outcome $outcome)
    {
        $total_cost = $outcome->where('id', $request->id)->first()->total_cost;

        DB::beginTransaction();
        try {
            $outcome->where('id', $request->id)->delete();

            Wallet::create([
                'balance' => Wallet::select('balance')->latest()->first()->balance + $total_cost,
                'outcome' => Wallet::select('outcome')->latest()->first()->outcome - $total_cost,
                'income' => Wallet::select('income')->latest()->first()->income,
                'profit' => Wallet::select('profit')->latest()->first()->profit,
                'description' => "menghapus pengeluaran",
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        $outcome->where('id', $request->id)->delete();


        return redirect()->back()->with('success', 'Pengeluaran Berhasil dihpaus');
    }
}
