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

    public function store(Request $request)
    {
        Store::create($request->all());

        return redirect()->back()->with('success', 'Store created successfully.');
    }

    public function update(Store $store, Request $request)
    {
        $store->where('id', $request->id)->update($request->all());
    }

    public function destroy(Store $store, Request $request)
    {
        $store->where('id', $request->id)->delete();
    }
}
