"use client";

import { Product } from '@olvad/types';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: Readonly<ProductCardProps>) {

    console.log(product)

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 animate-on-scroll">
            {/* Product Image */}
            <div className="relative h-56 bg-linear-to-br from-primary-50 to-primary-100 overflow-hidden">
                {/* Labels */}
                {product.tags && product.tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {/* {product.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className={`text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}
                            >
                                {tag}
                            </span>
                        ))} */}
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
                    <Image
                        src={product.photo as string}
                        alt={product.photo as string}
                        width={100}
                        height={100}
                        className='w-full object-cover aspect-square'
                    ></Image>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-secondary group-hover:text-primary-400 transition-colors">
                    {product.name}
                </h3>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                        <p className="text-xs text-secondary-300 mb-0.5">Mulai dari</p>
                        <p className="text-xl font-bold text-secondary">
                            Rp {product.price.toLocaleString('id-ID')}
                        </p>
                    </div>
                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={!product.available}
                        className={`w-12 aspect-square rounded-full font-bold text-white transition-all shadow-md hover:shadow-lg ${product.available
                            ? 'hover:scale-105'
                            : 'opacity-50 cursor-not-allowed'
                            }`}
                        style={
                            product.available
                                ? { backgroundColor: '#ABC4AA' }
                                : { backgroundColor: '#6B7280' }
                        }
                    >
                        {product.available ? '+' : ''}
                    </button>
                </div>
            </div>
        </div>
    );
}
