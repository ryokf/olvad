/**
 * Product Types
 * Generated from Laravel migration: 2026_01_23_062940_create_products_table.php
 */

import type { Category } from './category';
import type { ProductVariant } from './product-variant';

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  category_id: number;
  photo?: string | null;
  price: number;
  tags?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductWithRelations extends Product {
  category?: Category;
  variants?: ProductVariant[];
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  category_id: number;
  photo?: string;
  price: number;
  tags?: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  category_id?: number;
  photo?: string;
  price?: number;
  tags?: string;
}

export type ProductResponse = Product;
export type ProductWithRelationsResponse = ProductWithRelations;
export type ProductsResponse = Product[];
export type ProductsWithRelationsResponse = ProductWithRelations[];
