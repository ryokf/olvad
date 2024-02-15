<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Income\IncomeResource;
use App\Models\Customer;
use App\Models\Income;
use App\Models\Product;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index(Income $income, Product $product, Customer $customer, Unit $unit)
    {

        $incomes = $income->with('customer')->with('incomeDetails')->latest()->paginate(10);

        $incomes = IncomeResource::collection($incomes);

        return Inertia::render('Admin/Income/Index', compact('incomes'));
    }
}
