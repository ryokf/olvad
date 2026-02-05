export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    photo?: string;
    address?: string;
}

// ===== Category Types =====
export interface Category {
    id: string;
    name: string;
    products: Product[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    category: Category;
    photo: string;
    price: number;
    tags?: ('bestseller' | 'new' | 'spicy' | 'vegetarian' | 'recommended')[];
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
export interface VariantOption {
    name: string;
    priceModifier: number;
}

export interface ProductVariant {
    id: string;
    name: string; // e.g., "Temperature", "Size", "Sugar Level"
    type: 'single' | 'multiple'; // single = radio, multiple = checkbox
    required: boolean;
    options: VariantOption[];
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
