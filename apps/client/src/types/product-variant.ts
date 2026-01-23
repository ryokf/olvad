/**
 * Product Variant Types
 * Generated from Laravel migration: 2026_01_23_062953_create_product_variants_table.php
 */

import type { ProductVariantOption } from './product-variant-option';

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  is_single_selection: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductVariantWithRelations extends ProductVariant {
  options?: ProductVariantOption[];
}

export interface CreateProductVariantRequest {
  product_id: number;
  name: string;
  is_single_selection?: boolean;
}

export interface UpdateProductVariantRequest {
  name?: string;
  is_single_selection?: boolean;
}

export type ProductVariantResponse = ProductVariant;
export type ProductVariantWithRelationsResponse = ProductVariantWithRelations;
export type ProductVariantsResponse = ProductVariant[];
export type ProductVariantsWithRelationsResponse = ProductVariantWithRelations[];
