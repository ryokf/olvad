"use client";

import { useCart } from '@/contexts/CartContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, subtotal, total, updateQuantity, removeItem, clearCart } = useCart();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Keranjang Belanja
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                        <div className="text-8xl mb-4">🛒</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Keranjang Kosong
                        </h3>
                        <p className="text-gray-600 text-center">
                            Yuk mulai pesan menu favoritmu!
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-6 px-8 py-3 rounded-full font-bold text-white transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            style={{ backgroundColor: '#ABC4AA' }}
                        >
                            Lihat Menu
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl border-2 border-gray-200 p-4 space-y-3"
                                >
                                    {/* Product Name & Price */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Rp{' '}
                                                {item.product.basePrice.toLocaleString(
                                                    'id-ID'
                                                )}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Variants */}
                                    {item.selectedVariants.length > 0 && (
                                        <div className="space-y-1">
                                            {item.selectedVariants.map((variant) => (
                                                <div
                                                    key={variant.variantId}
                                                    className="text-sm text-gray-600"
                                                >
                                                    <span className="font-semibold">
                                                        {variant.variantName}:
                                                    </span>{' '}
                                                    {variant.selectedOptions.join(', ')}
                                                    {variant.additionalPrice > 0 && (
                                                        <span className="text-amber-700 ml-1">
                                                            (+Rp{' '}
                                                            {variant.additionalPrice.toLocaleString(
                                                                'id-ID'
                                                            )}
                                                            )
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Special Instructions */}
                                    {item.specialInstructions && (
                                        <div className="text-sm text-gray-600 bg-amber-50 p-2 rounded-lg">
                                            <span className="font-semibold">Catatan:</span>{' '}
                                            {item.specialInstructions}
                                        </div>
                                    )}

                                    {/* Quantity & Total */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold transition-colors"
                                            >
                                                −
                                            </button>
                                            <span className="font-bold text-gray-900 w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="text-lg font-bold text-amber-900">
                                            Rp {item.totalPrice.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Clear Cart Button */}
                        {items.length > 0 && (
                            <div className="px-6 py-3 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        if (
                                            confirm(
                                                'Yakin ingin mengosongkan keranjang?'
                                            )
                                        ) {
                                            clearCart();
                                        }
                                    }}
                                    className="w-full text-red-500 hover:text-red-700 font-semibold transition-colors"
                                >
                                    Kosongkan Keranjang
                                </button>
                            </div>
                        )}

                        {/* Footer Summary */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>Rp {total.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                            <a
                                href="/checkout"
                                className="block w-full py-4 rounded-full font-bold text-lg text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 text-center"
                                style={{ backgroundColor: '#ABC4AA' }}
                            >
                                Lanjut ke Checkout
                            </a>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
