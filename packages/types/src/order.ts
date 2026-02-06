import { Product, ProductVariantOption } from './product';
import { User } from './user';

// ===== Enums =====
export type OrderType = 'DELIVERY' | 'PICK_UP';
export type PaymentMethod = 'CASH' | 'CASHLESS';
export type OrderStatus = 'ON_PROCESS' | 'DONE' | 'CANCELED';

// ===== Detail Order Variant =====
export interface DetailOrderVariant {
    id: number;
    detailOrderId: number;
    productVariantOptionId: number;
    productVariantOption?: ProductVariantOption;
}

// ===== Detail Order =====
export interface DetailOrder {
    id: number;
    orderId: number;
    productId: number;
    qty: number;
    subtotalPrice: number;
    product?: Partial<Product>;
    variants?: DetailOrderVariant[];
}

// ===== Order =====
export interface Order {
    id: number;
    userId: number;
    type: OrderType;
    message?: string | null;
    paymentMethod: PaymentMethod;
    totalPrice: number;
    status: OrderStatus;
    user?: Partial<User>;
    detailOrders?: DetailOrder[];
}

// ===== Legacy Cart Types (untuk backward compatibility) =====
export interface SelectedVariant {
    variantId: string;
    variantName: string;
    selectedOptions: string[];
    additionalPrice: number;
}

export interface CartItem {
    id: string;
    product: Product;
    selectedVariants: SelectedVariant[];
    quantity: number;
    specialInstructions?: string;
    totalPrice: number;
}

export interface CartState {
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    itemCount: number;
}

export interface DeliveryInfo {
    name: string;
    phone: string;
    address?: string;
    deliveryMethod: 'pickup' | 'delivery' | 'dinein';
    notes?: string;
}
