<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Product $product)
    {
        $products = $product->latest()->paginate(10);

        return Inertia::render('Admin/Product/Index', compact('products'));
    }
}
