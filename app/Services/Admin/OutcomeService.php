<?php

namespace App\Services\Admin;

use App\Http\Resources\Outcome\OutcomeBuyResource;
use App\Http\Resources\Outcome\outcomeSocialResource;
use App\Models\Outcome;
use App\Models\OutcomeBuy;
use App\Models\OutcomeBuyDetail;
use App\Models\OutcomeDetail;
use App\Models\OutcomeSocial;
use App\Models\OutcomeSocialDetail;
use App\Models\ProductFlavor;
use App\Models\ProductSize;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;

class OutcomeService
{
    public function getData($params, $outcomeBuy, $outcomeSocial)
    {
        $outcomeBuys = $outcomeBuy->with('outcome')->with('store');
        $outcomeSocials = $outcomeSocial->with('outcome')->with('customer');

        if (isset($params->sort)) {
            if ($params->sort == 'desc' || $params->sort == '') {
                $outcomeBuys = $outcomeBuys->latest();
                $outcomeSocials = $outcomeSocials->latest();
            } elseif ($params->sort == 'asc') {
                $outcomeBuys = $outcomeBuys->oldest();
                $outcomeSocials = $outcomeSocials->oldest();
            } elseif ($params->sort == 'least') {
                $outcomeBuys = $outcomeBuys->latest();
                $outcomeSocials = $outcomeSocials->oldest();
            } elseif ($params->sort == 'most') {
                $outcomeBuys = $outcomeBuys->latest();
                $outcomeSocials = $outcomeSocials->oldest();
            } else {
                dd('y');
            }
        } else {
            $outcomeBuys = $outcomeBuys->latest();
            $outcomeSocials = $outcomeSocials->latest();
        }
        $outcomeBuys = $outcomeBuys->paginate(10);
        $outcomeSocials = $outcomeSocials->paginate(10);

        return [
            'outcomeBuys' => OutcomeBuyResource::collection($outcomeBuys),
            'outcomeSocials' => outcomeSocialResource::collection($outcomeSocials),
        ];
    }

    public function storeBuy($request, $outcome, $outcomeBuy, $outcomeDetail)
    {
        $total = 0;
        foreach ($request->detail_item as $item) {
            $total += $item['price'] * $item['amount'];
        }

        DB::beginTransaction();
        try {
            Outcome::create([
                'total_cost' => $total,
                'description' => $request->description,
            ]);

            $path = '/storage/'.$request->file('reciepe')->store('reciepe', 'public');

            OutcomeBuy::create([
                'outcome_id' => $outcome->select('id')->latest()->first()->id,
                'store_id' => $request->store_id,
                'reciepe' => $path,
            ]);

            $outcomeDetailId = $outcomeDetail->select('id')?->orderBy('id', 'desc')?->first()?->id == null ? 0 : $outcomeDetail->select('id')->orderBy('id', 'desc')->first()->id;

            foreach ($request->detail_item as $item) {
                OutcomeDetail::create([
                    'amount' => $item['amount'],
                    'unit_id' => $item['unit_id'],
                ]);

                OutcomeBuyDetail::create([
                    'outcome_detail_id' => ++$outcomeDetailId,
                    'outcome_buy_id' => $outcomeBuy->select('id')->latest()->first()->id,
                    'ingredient_id' => $item['ingredient_id'],
                    'price' => $item['price'],
                ]);
            }

            Wallet::create([
                'balance' => Wallet::select('balance')->latest()->first()->balance - $total,
                'outcome' => Wallet::select('outcome')->latest()->first()->outcome + $total,
                'income' => Wallet::select('income')->latest()->first()->income,
                'description' => 'melakukan pembelian',
            ]);

            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function storeSocial($request, $outcome, $outcomeSocial, $outcomeDetail)
    {
        // dd($request);

        $total = 0;
        foreach ($request->detail_item as $item) {
            if ($item['type'] == 'flavor') {
                $price = ProductFlavor::select('price')->where('id', $item['product_id'])->first()->price;
                $total += $price * $item['amount'];
            } elseif ($item['type'] == 'size') {
                $price = ProductSize::select('price')->where('id', $item['product_id'])->first()->price;
                $total += $price * $item['amount'];
            } else {
                dd('p');
            }
        }

        DB::beginTransaction();
        try {
            Outcome::create([
                'total_cost' => $total,
                'description' => $request->description,
            ]);

            OutcomeSocial::create([
                'outcome_id' => $outcome->select('id')->latest()->first()->id,
                'customer_id' => $request->customer_id,
            ]);

            $outcomeDetailId = $outcomeDetail->select('id')?->orderBy('id', 'desc')?->first()?->id == null ? 0 : $outcomeDetail->select('id')->orderBy('id', 'desc')->first()->id;

            foreach ($request->detail_item as $item) {
                OutcomeDetail::create([
                    'amount' => $item['amount'],
                    'unit_id' => $item['unit_id'],
                ]);

                OutcomeSocialDetail::create([
                    'outcome_detail_id' => ++$outcomeDetailId,
                    'outcome_social_id' => $outcomeSocial->select('id')->latest()->first()->id,
                    'product_id' => $item['parentProductId'],
                    'variant_product_id' => $item['product_id'],
                    'product_type' => $item['type'],
                ]);
            }

            Wallet::create([
                'balance' => Wallet::select('balance')->latest()->first()->balance - $request->total_cost,
                'outcome' => Wallet::select('outcome')->latest()->first()->outcome + $request->total_cost,
                'income' => Wallet::select('income')->latest()->first()->income,
                'description' => 'melakukan bantuan',
            ]);

            DB::commit();

            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        // return $request;
    }

    public function destroy($request, $outcome)
    {
        $total_cost = $outcome->where('id', $request->id)->first()->total_cost;

        DB::beginTransaction();
        try {
            $outcome->where('id', $request->id)->delete();

            Wallet::create([
                'balance' => Wallet::select('balance')->latest()->first()->balance + $total_cost,
                'outcome' => Wallet::select('outcome')->latest()->first()->outcome - $total_cost,
                'income' => Wallet::select('income')->latest()->first()->income,
                'description' => 'menghapus pengeluaran',
            ]);
            DB::commit();

            return true;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
