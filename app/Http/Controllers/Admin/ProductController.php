<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductResource;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Product $product)
    {
        $products = $product->with('productFlavors')->latest()->paginate(10);

        $products = ProductResource::collection($products);

        return Inertia::render('Admin/Product/Index', compact('products'));
    }
}
