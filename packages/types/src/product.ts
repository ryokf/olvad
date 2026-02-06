export interface Category {
    id: number;
    name: string;
    products?: Product[];
}

export interface Product {
    id: number;
    name: string;
    // description: string | null;
    categoryId: number;
    category: Category;
    photo: string | null;
    price: number;
    tags: string | null;
    // variants: ProductVariant[];
}

export interface ProductDetail extends Product {
    description: string | null;
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