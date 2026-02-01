"use client";

import { Product } from '@olvad/types';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const labelColors = {
    bestseller: 'bg-amber-500',
    new: 'bg-green-500',
    spicy: 'bg-red-500',
    vegetarian: 'bg-green-600',
    recommended: 'bg-purple-500',
};

const labelText = {
    bestseller: 'Terlaris',
    new: 'Baru',
    spicy: 'Pedas',
    vegetarian: 'Vegetarian',
    recommended: 'Rekomendasi',
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 animate-on-scroll">
            {/* Product Image */}
            <div className="relative h-56 bg-linear-to-br from-amber-50 to-orange-50 overflow-hidden">
                {/* Labels */}
                {product.labels && product.labels.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {product.labels.slice(0, 2).map((label) => (
                            <span
                                key={label}
                                className={`${labelColors[label]} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}
                            >
                                {labelText[label]}
                            </span>
                        ))}
                    </div>
                )}

                {/* Unavailable Overlay */}
                {!product.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                        <span className="text-white font-bold text-lg">Sold Out</span>
                    </div>
                )}

                {/* Image Placeholder - Replace with actual images */}
                <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                    {product.categoryId === 'signature' && '☕'}
                    {product.categoryId === 'espresso' && '☕'}
                    {product.categoryId === 'non-coffee' && '🥤'}
                    {product.categoryId === 'pastry' && '🥐'}
                    {product.categoryId === 'heavy-meal' && '🍽️'}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5 space-y-3">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {product.description}
                    </p>
                </div>

                {/* Preparation Time */}
                {product.preparationTime && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{product.preparationTime} menit</span>
                    </div>
                )}

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                        <p className="text-xs text-gray-500">Mulai dari</p>
                        <p className="text-2xl font-bold text-amber-900">
                            Rp {product.basePrice.toLocaleString('id-ID')}
                        </p>
                    </div>
                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={!product.available}
                        className={`px-6 py-3 rounded-full font-bold text-white transition-all shadow-md hover:shadow-lg ${product.available
                                ? 'hover:scale-105'
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                        style={
                            product.available
                                ? { backgroundColor: '#ABC4AA' }
                                : { backgroundColor: '#6B7280' }
                        }
                    >
                        {product.available ? 'Tambah' : 'Habis'}
                    </button>
                </div>
            </div>
        </div>
    );
}
