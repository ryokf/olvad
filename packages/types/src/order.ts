import { Product } from "./product";

export interface SelectedVariant {
    variantId: string;
    variantName: string;
    selectedOptions: string[]; // array of option names
    additionalPrice: number;
}

export interface CartItem {
    id: string; // unique cart item id
    product: Product;
    selectedVariants: SelectedVariant[];
    quantity: number;
    specialInstructions?: string;
    totalPrice: number; // calculated: basePrice + variants * quantity
}

export interface CartState {
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    itemCount: number;
}

// ===== Order Types =====
export interface DeliveryInfo {
    name: string;
    phone: string;
    address?: string;
    deliveryMethod: 'pickup' | 'delivery' | 'dinein';
    notes?: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    deliveryInfo: DeliveryInfo;
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    status:
        | 'pending'
        | 'confirmed'
        | 'preparing'
        | 'ready'
        | 'completed'
        | 'cancelled';
    createdAt: Date;
    estimatedTime?: Date;
}