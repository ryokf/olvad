"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartState, Product, SelectedVariant } from '@olvad/types';

interface CartContextType extends CartState {
    addItem: (product: Product, selectedVariants: SelectedVariant[], quantity: number, specialInstructions?: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('olvad-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to load cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('olvad-cart', JSON.stringify(items));
    }, [items]);

    const calculateTotalPrice = (
        basePrice: number,
        selectedVariants: SelectedVariant[],
        quantity: number
    ): number => {
        const variantsTotal = selectedVariants.reduce(
            (sum, variant) => sum + variant.additionalPrice,
            0
        );
        return (basePrice + variantsTotal) * quantity;
    };

    const addItem = (
        product: Product,
        selectedVariants: SelectedVariant[],
        quantity: number,
        specialInstructions?: string
    ) => {
        const newItem: CartItem = {
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            product,
            selectedVariants,
            quantity,
            specialInstructions,
            totalPrice: calculateTotalPrice(product.basePrice, selectedVariants, quantity),
        };

        setItems((prevItems) => [...prevItems, newItem]);
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(itemId);
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        quantity,
                        totalPrice: calculateTotalPrice(
                            item.product.basePrice,
                            item.selectedVariants,
                            quantity
                        ),
                    }
                    : item
            )
        );
    };

    const removeItem = (itemId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setItems([]);
    };

    // Calculate cart summary
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = 0; // No tax for now
    const total = subtotal + tax;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const value: CartContextType = {
        items,
        subtotal,
        tax,
        total,
        itemCount,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
