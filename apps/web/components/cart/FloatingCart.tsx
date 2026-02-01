"use client";

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from './CartDrawer';

export default function FloatingCart() {
    const { itemCount, total } = useCart();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    if (itemCount === 0) return null;

    return (
        <>
            {/* Mobile: Floating Action Button */}
            <button
                onClick={() => setIsDrawerOpen(true)}
                className="md:hidden fixed bottom-6 right-6 z-40 rounded-full shadow-2xl text-white p-5 hover:scale-110 transition-transform animate-bounce-subtle"
                style={{ backgroundColor: '#ABC4AA' }}
            >
                {/* Badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">
                    {itemCount}
                </div>
                <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            </button>

            {/* Desktop/Tablet: Bottom Bar */}
            <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40">
                <div className="max-w-7xl mx-auto px-6 pb-6">
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="w-full rounded-2xl shadow-2xl text-white p-5 hover:scale-105 transition-all"
                        style={{ backgroundColor: '#ABC4AA' }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <svg
                                        className="w-7 h-7"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        {itemCount}
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold">
                                        {itemCount} Item di Keranjang
                                    </p>
                                    <p className="text-xs opacity-90">Klik untuk lihat detail</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm opacity-90">Total</p>
                                    <p className="text-2xl font-bold">
                                        Rp {total.toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Cart Drawer */}
            <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    );
}
