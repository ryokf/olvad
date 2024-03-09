<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductFlavor;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Product $product, Category $categories)
    {
        $products = $product->where('is_archived', false)->with('productFlavors')->latest()->paginate(10);
        $products = ProductResource::collection($products);

        $categories = $categories->get();

        return Inertia::render('Admin/Product/index', compact('products', 'categories'));
    }

    public function store(Request $request, Product $product, ProductFlavor $productFlavor, ProductSize $productSize)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'category_id' => 'required',
        ]);

        DB::beginTransaction();
        try {

            $path = '/storage/' . $request->file('image')->store('image', 'public');

            $product->create([
                'name' => $request->name,
                'description' => $request->description,
                'image' => $path,
                'category_id' => $request->category_id,
            ]);

            $product_id = Product::latest()->first()->id;

            foreach ($request->variant_products as $variant) {
                if ($request->type == 'flavor') {
                    $productFlavor->create([
                        'product_id' => $product_id,
                        'flavor' => $variant['variant'],
                        'price' => $variant['price'],
                    ]);
                } elseif ($request->type == 'size') {
                    $productSize->create([
                        'product_id' => $product_id,
                        'size' => $variant['variant'],
                        'price' => $variant['price'],
                    ]);
                } else {
                    dd('woilah');
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return redirect()->route('admin.product.index')->with('message', 'data produk berhasil dibuat');
    }

    public function update(Request $request, Product $product, ProductFlavor $productFlavor, ProductSize $productSize)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'category_id' => 'required',
        ]);

        $product->where('id', $request->id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ]);

        foreach ($request->variant_products as $variant) {
            // dd($variant->flavor);
            if ($request->type == 'flavor' && !$productFlavor->where('product_id', $request->id)->where('flavor', $variant['flavor'])->exists()) {
                // dd('flavor nambah cuy');
                $productFlavor->create([
                    'product_id' => $request->id,
                    'flavor' => $variant['flavor'],
                    'price' => $variant['price'],
                ]);
            } elseif ($request->type == 'size' && !$productSize->where('product_id', $request->id)->where('size', $variant['size'])->exists()) {
                $productSize->create([
                    'product_id' => $request->id,
                    'size' => $variant['size'],
                    'price' => $variant['price'],
                ]);
            }
        }

        return redirect()->route('admin.product.index')->with('message', 'data produk berhasil diubah');
    }

    public function destroy(Request $request, Product $product)
    {
        $product->where('id', $request->id)->update(['is_archived' => true]);

        return redirect()->route('admin.product.index')->with('message', 'data produk berhasil dihapus');
    }

    public function destroyVariant(Request $request, ProductFlavor $productFlavor, ProductSize $productSize)
    {
        // dd($request);

        $flavorCount = $productFlavor->count();
        $sizeCount = $productSize->count();

        if ($request->type == 'flavor') {
            $productFlavor->where('id', $request->id)->update(['is_archived' => true]);
        } elseif ($request->type == 'size') {
            $productSize->where('id', $request->id)->update(['is_archived' => true]);
        } else {
            dd('woilah');
        }

        if ($flavorCount == $productFlavor->count() && $sizeCount == $productSize->count()) {
            if ($request->type == 'flavor') {
                $productFlavor->where('id', $request->id)->update(['is_archived' => true]);
            } elseif ($request->type == 'size') {
                $productSize->where('id', $request->id)->update(['is_archived' => true]);
            } else {
                dd('woilah');
            }
        }

        return redirect()->to('/admin/dashboard')->with('message', 'Product variant deleted successfully');
    }
}
