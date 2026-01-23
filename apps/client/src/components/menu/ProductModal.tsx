"use client";

import { useState, useEffect } from 'react';
import { Product, ProductVariant, SelectedVariant } from '@olvad/types';
import { useCart } from '@/contexts/CartContext';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addItem } = useCart();
    const [selectedVariants, setSelectedVariants] = useState<
        Record<string, string[]>
    >({});
    const [quantity, setQuantity] = useState(1);
    const [specialInstructions, setSpecialInstructions] = useState('');

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen && product) {
            setSelectedVariants({});
            setQuantity(1);
            setSpecialInstructions('');
        }
    }, [isOpen, product]);

    if (!isOpen || !product) return null;

    const handleVariantChange = (variantId: string, optionName: string, isMultiple: boolean) => {
        setSelectedVariants((prev) => {
            if (isMultiple) {
                // Multiple selection (checkboxes)
                const current = prev[variantId] || [];
                const newSelection = current.includes(optionName)
                    ? current.filter((o) => o !== optionName)
                    : [...current, optionName];
                return { ...prev, [variantId]: newSelection };
            } else {
                // Single selection (radio)
                return { ...prev, [variantId]: [optionName] };
            }
        });
    };

    const calculateTotalPrice = (): number => {
        let total = product.basePrice;

        product.variants.forEach((variant) => {
            const selected = selectedVariants[variant.id] || [];
            selected.forEach((optionName) => {
                const option = variant.options.find((o) => o.name === optionName);
                if (option) {
                    total += option.priceModifier;
                }
            });
        });

        return total * quantity;
    };

    const isValid = (): boolean => {
        // Check if all required variants are selected
        return product.variants
            .filter((v) => v.required)
            .every((v) => selectedVariants[v.id] && selectedVariants[v.id].length > 0);
    };

    const handleAddToCart = () => {
        if (!isValid()) return;

        const formattedVariants: SelectedVariant[] = product.variants
            .filter((v) => selectedVariants[v.id] && selectedVariants[v.id].length > 0)
            .map((variant) => {
                const options = selectedVariants[variant.id];
                const additionalPrice = options.reduce((sum, optionName) => {
                    const option = variant.options.find((o) => o.name === optionName);
                    return sum + (option?.priceModifier || 0);
                }, 0);

                return {
                    variantId: variant.id,
                    variantName: variant.name,
                    selectedOptions: options,
                    additionalPrice,
                };
            });

        addItem(product, formattedVariants, quantity, specialInstructions || undefined);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div
                    className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-slide-up"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {product.name}
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

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 space-y-6">
                        {/* Product Info */}
                        <div>
                            <p className="text-gray-600 mb-3">{product.description}</p>
                            <p className="text-2xl font-bold text-amber-900">
                                Rp {product.basePrice.toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Variants */}
                        {product.variants.map((variant) => (
                            <div key={variant.id} className="space-y-3">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {variant.name}
                                    {variant.required && (
                                        <span className="text-red-500 ml-1">*</span>
                                    )}
                                </h3>

                                {variant.type === 'single' ? (
                                    // Radio buttons
                                    <div className="space-y-2">
                                        {variant.options.map((option) => {
                                            const isSelected = selectedVariants[
                                                variant.id
                                            ]?.includes(option.name);
                                            return (
                                                <button
                                                    key={option.name}
                                                    onClick={() =>
                                                        handleVariantChange(
                                                            variant.id,
                                                            option.name,
                                                            false
                                                        )
                                                    }
                                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                                            ? 'border-amber-500 bg-amber-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold text-gray-900">
                                                            {option.name}
                                                        </span>
                                                        {option.priceModifier !== 0 && (
                                                            <span className="text-amber-700 font-semibold">
                                                                {option.priceModifier > 0
                                                                    ? '+'
                                                                    : ''}
                                                                Rp{' '}
                                                                {option.priceModifier.toLocaleString(
                                                                    'id-ID'
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // Checkboxes
                                    <div className="space-y-2">
                                        {variant.options.map((option) => {
                                            const isSelected = selectedVariants[
                                                variant.id
                                            ]?.includes(option.name);
                                            return (
                                                <button
                                                    key={option.name}
                                                    onClick={() =>
                                                        handleVariantChange(
                                                            variant.id,
                                                            option.name,
                                                            true
                                                        )
                                                    }
                                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                                            ? 'border-amber-500 bg-amber-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected
                                                                        ? 'bg-amber-500 border-amber-500'
                                                                        : 'border-gray-300'
                                                                    }`}
                                                            >
                                                                {isSelected && (
                                                                    <svg
                                                                        className="w-3 h-3 text-white"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={3}
                                                                            d="M5 13l4 4L19 7"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <span className="font-semibold text-gray-900">
                                                                {option.name}
                                                            </span>
                                                        </div>
                                                        {option.priceModifier !== 0 && (
                                                            <span className="text-amber-700 font-semibold">
                                                                {option.priceModifier > 0
                                                                    ? '+'
                                                                    : ''}
                                                                Rp{' '}
                                                                {option.priceModifier.toLocaleString(
                                                                    'id-ID'
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Special Instructions */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-gray-900">
                                Catatan Khusus (Opsional)
                            </h3>
                            <textarea
                                value={specialInstructions}
                                onChange={(e) => setSpecialInstructions(e.target.value)}
                                placeholder="Contoh: Gelas terpisah, es banyak, dll."
                                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                                rows={3}
                            />
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-gray-900">Jumlah</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-xl transition-colors"
                                >
                                    −
                                </button>
                                <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-xl transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                        <button
                            onClick={handleAddToCart}
                            disabled={!isValid()}
                            className={`w-full py-4 rounded-full font-bold text-lg text-white transition-all shadow-lg ${isValid()
                                    ? 'hover:scale-105 hover:shadow-xl'
                                    : 'opacity-50 cursor-not-allowed'
                                }`}
                            style={
                                isValid()
                                    ? { backgroundColor: '#ABC4AA' }
                                    : { backgroundColor: '#6B7280' }
                            }
                        >
                            <div className="flex items-center justify-between px-6">
                                <span>Tambah ke Keranjang</span>
                                <span className="font-bold">
                                    Rp {calculateTotalPrice().toLocaleString('id-ID')}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
