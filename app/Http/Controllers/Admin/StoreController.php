<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index(Store $store)
    {
        $stores = $store->latest()->paginate(10);

        return Inertia::render('Admin/Store/Index', compact('stores'));
    }
}
