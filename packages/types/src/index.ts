import { Product } from './product';

export * from './auth';
export * from './user';
export * from './product';
export * from './order';

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
