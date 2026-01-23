/**
 * Product Variant Option Types
 * Generated from Laravel migration: 2026_01_23_062958_create_product_variant_options_table.php
 */

export interface ProductVariantOption {
  id: number;
  product_variant_id: number;
  name: string;
  add_price: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductVariantOptionRequest {
  product_variant_id: number;
  name: string;
  add_price?: number;
}

export interface UpdateProductVariantOptionRequest {
  name?: string;
  add_price?: number;
}

export type ProductVariantOptionResponse = ProductVariantOption;
export type ProductVariantOptionsResponse = ProductVariantOption[];
