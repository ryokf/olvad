export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    photo?: string;
    address?: string;
}

// ===== Category Types =====
export interface Category {
    id: number;
    name: string;
    products?: Product[];
}

export interface Product {
    id: number;
    name: string;
    description: string | null;
    categoryId: number;
    category: Category;
    photo: string | null;
    price: number;
    tags: string | null;
    variants: ProductVariant[];
}

export interface CreateProductRequest {
    name: string;
    description?: string;
    categoryId: number;
    photo?: string;
    price: number;
    tags?: string;
}

export interface UpdateProductRequest {
    name?: string;
    description?: string;
    categoryId?: number;
    photo?: string;
    price?: number;
    tags?: string;
}

// ===== Product Variant Types =====
export interface ProductVariantOption {
    id: number;
    productVariantId: number;
    name: string;
    addPrice: number;
}

export interface ProductVariant {
    id: number;
    productId: number;
    name: string; // e.g., "Temperature", "Size", "Sugar Level"
    isSingleSelection: boolean;
    options: ProductVariantOption[];
}

// ===== Product Types =====

// ===== Cart Types =====
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

// ===== Filter & Search Types =====
export interface MenuFilters {
    categoryId?: string;
    searchQuery?: string;
    labels?: string[];
    priceRange?: {
        min: number;
        max: number;
    };
}

export interface SearchResult {
    products: Product[];
    totalCount: number;
}
