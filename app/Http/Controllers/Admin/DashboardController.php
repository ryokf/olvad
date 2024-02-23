<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Wallet $wallet)
    {
        $wallets = $wallet->latest()->first();

        return Inertia::render('Admin/Dashboard/index', compact('wallets'));
    }
}
