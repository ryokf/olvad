<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Income;
use App\Models\Product;
use App\Services\Admin\IncomeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    private $incomeService;

    public function __construct(IncomeService $incomeService)
    {
        $this->incomeService = $incomeService;
    }

    public function index(Income $income, Product $product, Customer $customer)
    {
        $data = $this->incomeService->getData($income, $product, $customer);
        $incomes = $data['incomes'];
        $products = $data['products'];
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
