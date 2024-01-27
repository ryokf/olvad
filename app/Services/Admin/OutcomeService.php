<?php

namespace App\Services\Admin;

use App\Models\Outcome;
use App\Models\OutcomeBuy;
use App\Models\OutcomeBuyDetail;
use App\Models\OutcomeDetail;
use App\Models\OutcomeSocial;
use App\Models\OutcomeSocialDetail;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;

class OutcomeService
{
    public function storeBuy($request, $outcome, $outcomeBuy, $outcomeDetail)
    {
        DB::beginTransaction();
        try{
            Outcome::create([
                'total_cost' => $request->total_cost,
                'description' => $request->description,
            ]);

            OutcomeBuy::create([
                'outcome_id' => $outcome->select('id')->latest()->first()->id,
                'store_id' => $request->store_id,
                'reciepe' => 'ini foto',
            ]);

            $outcomeDetailId = $outcomeDetail->select('id')->orderBy('id', 'desc')->first()->id;

            foreach($request->detail_item as $item) {
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
                'balance' => Wallet::select('balance')->latest()->first()->balance - $request->total_cost,
                'outcome' => Wallet::select('outcome')->latest()->first()->outcome + $request->total_cost,
                'income' => Wallet::select('income')->latest()->first()->income,
                'profit' => Wallet::select('profit')->latest()->first()->profit,
                'description' => "melakukan pembelian",
            ]);

            DB::commit();
            return true;
        } catch(\Exception $e) {
            DB::rollBack();
            throw $e;
        }

    }

    public function storeSocial($request, $outcome, $outcomeSocial, $outcomeDetail)
    {
        DB::beginTransaction();
        try{
            Outcome::create([
                'total_cost' => $request->total_cost,
                'description' => $request->description,
            ]);

            OutcomeSocial::create([
                'outcome_id' => $outcome->select('id')->latest()->first()->id,
                'customer_id' => $request->customer_id,
                'reciepe' => 'ini foto',
            ]);

            $outcomeDetailId = $outcomeDetail->select('id')->orderBy('id', 'desc')->first()->id;

            foreach($request->detail_item as $item) {
                OutcomeDetail::create([
                    'amount' => $item['amount'],
                    'unit_id' => $item['unit_id'],
                ]);

                OutcomeSocialDetail::create([
                    'outcome_detail_id' => ++$outcomeDetailId,
                    'outcome_social_id' => $outcomeSocial->select('id')->latest()->first()->id,
                    'product_id' => $item['product_id'],
                ]);
            }

            Wallet::create([
                'balance' => Wallet::select('balance')->latest()->first()->balance - $request->total_cost,
                'outcome' => Wallet::select('outcome')->latest()->first()->outcome + $request->total_cost,
                'income' => Wallet::select('income')->latest()->first()->income,
                'profit' => Wallet::select('profit')->latest()->first()->profit,
                'description' => "melakukan bantuan",
            ]);

            DB::commit();
            return true;
        } catch(\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        // return $request;
    }
}
