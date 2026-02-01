"use client";

import { useState } from 'react';
import { categories, products } from '@/data/products';
import { Product } from '@olvad/types';
import CategoryFilter from '@/components/menu/CategoryFilter';
import SearchBar from '@/components/menu/SearchBar';
import ProductGrid from '@/components/menu/ProductGrid';
import ProductModal from '@/components/menu/ProductModal';
import FloatingCart from '@/components/cart/FloatingCart';

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300); // Wait for animation
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <div className="bg-linear-to-br from-amber-50 to-orange-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900">
                            Menu Kami
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Pilih menu favoritmu dan nikmati cita rasa terbaik dari Olvad
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white py-8 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <SearchBar onSearch={setSearchQuery} />
                </div>
            </div>

            {/* Category Filter */}
            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <ProductGrid
                    products={products}
                    categories={categories}
                    searchQuery={searchQuery}
                    onProductSelect={handleProductSelect}
                />
            </div>

            {/* Product Customization Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />

            {/* Floating Cart */}
            <FloatingCart />
        </div>
    );
}
