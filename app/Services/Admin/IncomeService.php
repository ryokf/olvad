<?php

namespace App\Services\Admin;

use App\Http\Resources\Income\IncomeResource;
use App\Models\Income;
use App\Models\IncomeDetail;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class IncomeService
{
    public function getData($income,  $product, $customer)
    {
        $incomes = $income->with('customer')->with('incomeDetails')->latest()->paginate(10);
        $products = $product->get();
        $customers = $customer->get();

        $incomes = IncomeResource::collection($incomes);

        return [
            'incomes' => $incomes,
            'products' => $products,
            'customers' => $customers
        ];
    }

    public function storeData($request, $income)
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
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

}
