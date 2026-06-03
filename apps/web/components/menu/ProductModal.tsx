"use client";

import { useState, useEffect } from 'react';
import { ProductDetail, SelectedVariant } from '@olvad/types';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/services/product';

interface ProductModalProps {
    productId: number;
    isOpen: boolean;
    onClose: () => void;
}

interface VariantOption {
    name: string;
    addPrice: number;
}

interface VariantOptionButtonProps {
    option: VariantOption;
    isSelected: boolean;
    onClick: () => void;
}

function PriceLabel({ addPrice }: Readonly<{ addPrice: number }>) {
    if (addPrice === 0) return null;
    return (
        <span className="text-primary-400 font-semibold">
            {addPrice > 0 ? '+' : ''}Rp {addPrice.toLocaleString('id-ID')}
        </span>
    );
}

function VariantOptionButton({ option, isSelected, onClick }: Readonly<VariantOptionButtonProps>) {
    return (
        <button
            onClick={onClick}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected
                ? 'border-primary-400 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
        >
            <div className="flex items-center justify-between">
                <span className="font-semibold text-secondary">
                    {option.name}
                </span>
                <PriceLabel addPrice={option.addPrice} />
            </div>
        </button>
    );
}

function CheckboxOptionButton({ option, isSelected, onClick }: Readonly<VariantOptionButtonProps>) {
    return (
        <button
            onClick={onClick}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected
                ? 'border-primary-400 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected
                            ? 'bg-primary-400 border-primary-400'
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
                    <span className="font-semibold text-secondary">
                        {option.name}
                    </span>
                </div>
                <PriceLabel addPrice={option.addPrice} />
            </div>
        </button>
    );
}

function calculateOptionPrice(options: VariantOption[], selectedOptionNames: string[]): number {
    return selectedOptionNames.reduce((sum, optionName) => {
        const option = options.find((o) => o.name === optionName);
        return sum + (option?.addPrice ?? 0);
    }, 0);
}

function getAdditionalPrice(options: VariantOption[], optionNames: string[]): number {
    return optionNames.reduce((sum, name) => {
        const opt = options.find((o) => o.name === name);
        return sum + (opt?.addPrice ?? 0);
    }, 0);
}

export default function ProductModal({ productId, isOpen, onClose }: Readonly<ProductModalProps>) {
    const { addItem } = useCart();
    // State tracks selected options as { name, id }[] per variant ID
    const [selectedVariants, setSelectedVariants] = useState<
        Record<string, { name: string; id: number }[]>
    >({}); 
    const [quantity, setQuantity] = useState(1);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [product, setProduct] = useState<ProductDetail>()

    // Fetch product when productId changes
    useEffect(() => {
        const fetchProduct = async (id: number) => {
            const data = await getProductById(id)
            setProduct(data)
        }

        if (productId > 0) {
            fetchProduct(productId)
        }
    }, [productId]);

    // Reset state when modal opens (without useEffect to avoid cascading renders)
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
    const [prevProductId, setPrevProductId] = useState(productId);
    if (isOpen && (!prevIsOpen || productId !== prevProductId)) {
        setSelectedVariants({});
        setQuantity(1);
        setSpecialInstructions('');
        setPrevIsOpen(isOpen);
        setPrevProductId(productId);
    }
    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen);
    }

    if (!isOpen || !product) return null;

    const handleVariantChange = (variantId: string, option: { name: string; id: number }, isMultiple: boolean) => {
        setSelectedVariants((prev) => {
            if (isMultiple) {
                const current = prev[variantId] || [];
                const exists = current.some((o) => o.id === option.id);
                const newSelection = exists
                    ? current.filter((o) => o.id !== option.id)
                    : [...current, option];
                return { ...prev, [variantId]: newSelection };
            } else {
                return { ...prev, [variantId]: [option] };
            }
        });
    };

    const calculateTotalPrice = (): number => {
        const variantTotal = product.variants.reduce((sum, variant) => {
            const selected = selectedVariants[variant.id] || [];
            return sum + calculateOptionPrice(variant.options, selected.map(o => o.name));
        }, 0);

        return (product.price + variantTotal) * quantity;
    };

    // const isValid = (): boolean => {
    //     // Check if all required variants are selected
    //     return product.variants
    //         .filter((v) => v.required)
    //         .every((v) => selectedVariants[v.id] && selectedVariants[v.id].length > 0);
    // };

    const handleAddToCart = () => {
        const formattedVariants: SelectedVariant[] = product.variants
            .filter((v) => selectedVariants[v.id] && selectedVariants[v.id].length > 0)
            .map((variant) => {
                const selected = selectedVariants[variant.id];
                return {
                    variantId: variant.id.toString(),
                    variantName: variant.name,
                    selectedOptions: selected.map(o => o.name),
                    selectedOptionIds: selected.map(o => o.id),
                    additionalPrice: getAdditionalPrice(variant.options, selected.map(o => o.name)),
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
                        <h2 className="text-2xl font-bold text-secondary">
                            {product.name}
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                            <svg
                                className="w-6 h-6 text-secondary-300"
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
                            <p className="text-secondary-300 mb-3">{product.description}</p>
                            <p className="text-2xl font-bold text-primary-800">
                                Rp {product.price.toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Variants */}
                        {product.variants.map((variant) => (
                            <div key={variant.id} className="space-y-3">
                                <h3 className="text-lg font-bold text-secondary">
                                    {variant.name}
                                </h3>

                                <div className="space-y-2">
                                    {variant.options.map((option) => {
                                        const selectedArr = selectedVariants[variant.id] || [];
                                        const isSelected = selectedArr.some((o) => o.id === option.id);
                                        const isMultiple = !variant.isSingleSelection;
                                        const handleClick = () => handleVariantChange(
                                            variant.id.toString(),
                                            { name: option.name, id: option.id },
                                            isMultiple
                                        );

                                        return isMultiple ? (
                                            <CheckboxOptionButton key={option.id} option={option} isSelected={isSelected} onClick={handleClick} />
                                        ) : (
                                            <VariantOptionButton key={option.id} option={option} isSelected={isSelected} onClick={handleClick} />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Special Instructions */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-secondary">
                                Catatan Khusus (Opsional)
                            </h3>
                            <textarea
                                value={specialInstructions}
                                onChange={(e) => setSpecialInstructions(e.target.value)}
                                placeholder="Contoh: Gelas terpisah, es banyak, dll."
                                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none resize-none"
                                rows={3}
                            />
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-secondary">Jumlah</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-xl transition-colors"
                                >
                                    −
                                </button>
                                <span className="text-2xl font-bold text-secondary w-12 text-center">
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
                            // disabled={!isValid()}
                            className={`w-full py-4 rounded-full font-bold text-lg text-white transition-all shadow-lg ${
                                // isValid()
                                true
                                    ? 'hover:scale-105 hover:shadow-xl'
                                    : 'opacity-50 cursor-not-allowed'
                                }`}
                            style={
                                // isValid()
                                true
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
