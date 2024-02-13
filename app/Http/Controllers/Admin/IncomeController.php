<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Income;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index(Income $income)
    {

        $incomes = $income->with('customer')->latest()->paginate(10);
        // $incomes =

        return Inertia::render('Admin/Income/Index', compact('incomes'));
    }
}
