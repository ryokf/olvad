import { Product, ProductVariantOption } from './product';
import { User } from './user';

// ===== Enums =====
export type OrderType = 'DELIVERY' | 'PICK_UP' | 'DINE_IN';
export type PaymentMethod = 'QRIS' | 'TRANSFER' | 'CASHIER';
export type PaymentStatus = 'UNPAID' | 'AWAITING_VERIFICATION' | 'PAID';
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
    userId?: number | null; // Optional for guest checkout
    customerName: string;
    customerPhone: string;
    type: OrderType;
    tableNumber?: string | null; // For dine-in orders
    pickupTime?: string | null; // For pickup orders
    deliveryAddress?: string | null; // For delivery orders
    notes?: string | null;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    paymentProof?: string | null;
    totalPrice: number;
    status: OrderStatus;
    user?: Partial<User> | null;
    detailOrders?: DetailOrder[];
}

// ===== Legacy Cart Types (untuk backward compatibility) =====
export interface SelectedVariant {
    variantId: string;
    variantName: string;
    selectedOptions: string[];
    selectedOptionIds: number[]; // IDs of selected ProductVariantOption
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
