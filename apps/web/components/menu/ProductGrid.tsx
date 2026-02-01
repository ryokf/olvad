"use client";

import { Product, Category } from '@olvad/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    categories: Category[];
    searchQuery: string;
    onProductSelect: (product: Product) => void;
}

export default function ProductGrid({
    products,
    categories,
    searchQuery,
    onProductSelect,
}: ProductGridProps) {
    // Filter products based on search
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group products by category
    const productsByCategory = categories.map((category) => ({
        category,
        products: filteredProducts.filter((p) => p.categoryId === category.id),
    }));

    if (filteredProducts.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Tidak menemukan menu
                </h3>
                <p className="text-gray-600">
                    Coba kata kunci lain atau lihat semua menu kami
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {productsByCategory.map(
                ({ category, products: categoryProducts }) =>
                    categoryProducts.length > 0 && (
                        <div key={category.id} id={`category-${category.id}`}>
                            {/* Category Header */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                    <span className="text-4xl">{category.icon}</span>
                                    {category.name}
                                </h2>
                                <div
                                    className="h-1 w-20 rounded-full mt-3"
                                    style={{ backgroundColor: '#ABC4AA' }}
                                />
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {categoryProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={onProductSelect}
                                    />
                                ))}
                            </div>
                        </div>
                    )
            )}
        </div>
    );
}
