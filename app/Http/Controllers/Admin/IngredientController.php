<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IngredientController extends Controller
{
    public function index(Ingredient $ingredient)
    {
        $ingredients = collect($ingredient->latest()->paginate(10));

        return Inertia::render('Admin/Ingredient/Index', compact('ingredients'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        Ingredient::create([
            'name' => request('name'),
        ]);

        return redirect()->back()->with('message', 'data bahan berhasil ditambahkan');
    }

    public function destroy(Ingredient $ingredient)
    {
        $ingredient->where('id', request('id') ?? '')->delete();

        return redirect()->back()->with('message', 'data bahan berhasil dihapus');
    }
}
