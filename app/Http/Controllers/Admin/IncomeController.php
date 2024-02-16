<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Income\IncomeResource;
use App\Models\Customer;
use App\Models\Income;
use App\Models\IncomeDetail;
use App\Models\Product;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index(Income $income, Product $product, Customer $customer)
    {
        $incomes = $income->with('customer')->with('incomeDetails')->latest()->paginate(10);
        $products = $product->get();
        $customers = $customer->get();

        $incomes = IncomeResource::collection($incomes);

        return Inertia::render('Admin/Income/Index', compact('incomes', 'products', 'customers'));
    }

    public function store(Request $request, Income $income)
    {
        $total = 0;
        foreach ($request->detail_items as $item) {
            $price = Product::select('price')->where('id', $item['product_id'])->first()->price;
            $total += $price * $item['amount'];
        }

        DB::beginTransaction();

        try {
            Income::create([
                'customer_id' => $request->customer_id,
                'description' => $request->description,
                'is_from_web' => false,
                'total_cost' => $total,
            ]);
            $incomeId = $income->select('id')->orderBy('id', 'desc')->first()->id;

            foreach ($request->detail_items as $item) {
                IncomeDetail::create([
                    'income_id' => $incomeId,
                    'amount' => $item['amount'],
                    'product_id' => $item['product_id'],
                ]);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return redirect()->back()->with('message', 'data pemasukan berhasil ditambahkan');
    }

    public function destroy(Request $request, Income $income)
    {
        $income->where('id', $request->id)->delete();

        return redirect()->back()->with('message', 'data pemasukan berhasil dihapus');
    }
}
