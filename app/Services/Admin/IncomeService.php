<?php

namespace App\Services\Admin;

use App\Http\Resources\Income\IncomeResource;
use App\Models\Income;
use App\Models\IncomeDetail;
use App\Models\ProductFlavor;
use App\Models\ProductSize;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;

class IncomeService
{
    public function getData($income, $customer)
    {
        $incomes = $income->with('customer')->with('incomeDetails')->latest()->paginate(10);
        // $products = $product->get();
        $customers = $customer->where('is_archived', false)->get();

        $incomes = IncomeResource::collection($incomes);

        return [
            'incomes' => $incomes,
            // 'products' => $products,
            'customers' => $customers,
        ];
    }

    public function storeData($request, $income)
    {
        // dd($request);

        $total = 0;
        foreach ($request->detail_items as $item) {
            if ($item['type'] == 'flavor') {
                $price = ProductFlavor::select('price')->where('id', $item['product_id'])->first()->price;
                $total += $price * $item['amount'];
            } elseif ($item['type'] == 'size') {
                $price = ProductSize::select('price')->where('id', $item['product_id'])->first()->price;
                $total += $price * $item['amount'];
            } else {
                dd('woilah');
            }
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
                    'product_id' => $item['parentProductId'],
                    'variant_product_id' => $item['product_id'],
                    'product_type' => $item['type'],
                ]);
            }

            Wallet::create([
                'balance' => Wallet::select('balance')->latest()->first()->balance + $total,
                'outcome' => Wallet::select('outcome')->latest()->first()->outcome,
                'income' => Wallet::select('income')->latest()->first()->income + $total,
                'description' => 'menambah pemasukan',
            ]);
            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
