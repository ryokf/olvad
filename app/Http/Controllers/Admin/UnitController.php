<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function store(Request $request, Unit $unit)
    {
        $request->validate([
            'unit' => 'required',
        ]);

        $unit->create($request->all());

        return back();
    }

    public function destroy(Request $request, Unit $unit)
    {
        $unit->where('id', $request->id)->delete();
        return back();
    }
}
