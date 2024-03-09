<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Income\ProductFlavorResource;
use App\Http\Resources\Income\ProductSizeResource;
use App\Models\Customer;
use App\Models\Income;
use App\Models\ProductFlavor;
use App\Models\ProductSize;
use App\Models\Wallet;
use App\Services\Admin\IncomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class IncomeController extends Controller
{
    private $incomeService;

    public function __construct(IncomeService $incomeService)
    {
        $this->incomeService = $incomeService;
    }

    public function index(Income $income, ProductFlavor $productFlavor, ProductSize $productSize, Customer $customer)
    {
        $data = $this->incomeService->getData($income, $customer);
        $incomes = $data['incomes'];

        // return $incomes;

        $productFlavor = ProductFlavorResource::collection($productFlavor->where('is_archived', false)->with('product')->get(), true);
        $productSize = ProductSizeResource::collection($productSize->where('is_archived', false)->with('product')->get(), false);
        $products = Arr::flatten([Arr::flatten($productFlavor), Arr::flatten($productSize)]);
        $products = collect($products)->sortBy('product.name')->values()->all();

        // $products = $data['products'];
        $customers = $data['customers'];

        return Inertia::render('Admin/Income/index', compact('incomes', 'products', 'customers'));
    }

    public function store(Request $request, Income $income)
    {
        $this->incomeService->storeData($request, $income);

        return redirect()->back()->with('message', 'data pemasukan berhasil ditambahkan');
    }

    public function destroy(Request $request, Income $income)
    {
        $total = $income->select('total_cost')->where('id', $request->id)->first()->total_cost;

        DB::beginTransaction();
        try {
            $income->where('id', $request->id)->delete();

            Wallet::create([
                'balance' => Wallet::select('balance')->latest()->first()->balance - $total,
                'outcome' => Wallet::select('outcome')->latest()->first()->outcome,
                'income' => Wallet::select('income')->latest()->first()->income - $total,
                'description' => 'menghapus pemasukan',
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        return redirect()->back()->with('message', 'data pemasukan berhasil dihapus');
    }
}
