/**
 * Detail Order Variant Types
 * Generated from Laravel migration: 2026_01_23_063023_create_detail_order_variants_table.php
 */

import type { ProductVariantOption } from './product-variant-option';

export interface DetailOrderVariant {
  id: number;
  detail_order_id: number;
  product_variant_option_id: number;
  created_at: string;
  updated_at: string;
}

export interface DetailOrderVariantWithRelations extends DetailOrderVariant {
  variant_option?: ProductVariantOption;
}

export interface CreateDetailOrderVariantRequest {
  detail_order_id: number;
  product_variant_option_id: number;
}

export type DetailOrderVariantResponse = DetailOrderVariant;
export type DetailOrderVariantWithRelationsResponse = DetailOrderVariantWithRelations;
export type DetailOrderVariantsResponse = DetailOrderVariant[];
export type DetailOrderVariantsWithRelationsResponse = DetailOrderVariantWithRelations[];
