<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index(Wallet $wallet)
    {
        $wallets = Wallet::latest()->first();

        return Inertia::render('Admin/Setting/index', compact('wallets'));
    }
}
