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
        $stores = $store->where('is_archived', false)->latest()->paginate(10);

        return Inertia::render('Admin/Store/index', compact('stores'));
    }

    public function store(Request $request)
    {
        Store::create($request->all());

        return redirect()->back()->with('message', 'data toko berhasil ditambahkan');
    }

    public function update(Store $store, Request $request)
    {
        $store->where('id', $request->id)->update($request->all());

        return redirect()->back()->with('message', 'data toko berhasil diubah');
    }

    public function destroy(Store $store, Request $request)
    {
        $store->where('id', $request->id)->update(['is_archived' => true]);

        return redirect()->back()->with('message', 'data toko berhasil dihapus');
    }
}
