<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Customer $customer)
    {
        $customers = $customer->where('is_archived', false)->latest()->paginate(10);

        return Inertia::render('Admin/Customer/index', compact('customers'));
    }

    public function store(Request $request)
    {
        Customer::create($request->all());

        return redirect()->back()->with('message', 'data pelanggan baru berhasil disimpan');
    }

    public function update(Request $request, Customer $customer)
    {
        $customer->where('id', $request->id)->update($request->all());

        return redirect()->back()->with('message', 'data pelanggan berhasil diedit');
    }

    public function destroy(Request $request, Customer $customer)
    {
        $customer->where('id', $request->id)->update(['is_archived' => true]);

        return redirect()->back()->with('message', 'data pelanggan berhasil dihapus');
    }
}
