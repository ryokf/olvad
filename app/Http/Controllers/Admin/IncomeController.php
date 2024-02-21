<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Income\ProductFlavorResource;
use App\Http\Resources\Income\ProductSizeResource;
use App\Models\Customer;
use App\Models\Income;
use App\Models\Product;
use App\Models\ProductFlavor;
use App\Models\ProductSize;
use App\Services\Admin\IncomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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

        $productFlavor = ProductFlavorResource::collection($productFlavor->with('product')->get(), true);
        $productSize = ProductSizeResource::collection($productSize->with('product')->get(), false);
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
        $income->where('id', $request->id)->delete();

        return redirect()->back()->with('message', 'data pemasukan berhasil dihapus');
    }
}
