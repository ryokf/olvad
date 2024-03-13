<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use App\Models\Wallet;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index(Wallet $wallet, Unit $unit)
    {
        $wallets = Wallet::latest()->first();
        $units = Unit::all();

        return Inertia::render('Admin/Setting/index', compact('wallets', 'units'));
    }
}
