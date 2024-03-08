<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function store(Request $request, Wallet $wallet)
    {

        $wallet->create([
            'balance' => $request->balance,
            'income' => $request->income,
            'outcome' => $request->outcome,
            'description' => 'melakukan edit data manual',
        ]);

        return redirect()->back();
    }
}
