/**
 * Detail Order Types
 * Generated from Laravel migration: 2026_01_23_063017_create_detail_orders_table.php
 */

import type { Product } from './product';
import type { DetailOrderVariant } from './detail-order-variant';

export interface DetailOrder {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  subtotal_price: number;
  created_at: string;
  updated_at: string;
}

export interface DetailOrderWithRelations extends DetailOrder {
  product?: Product;
  variants?: DetailOrderVariant[];
}

export interface CreateDetailOrderRequest {
  order_id: number;
  product_id: number;
  qty: number;
  subtotal_price?: number;
}

export interface UpdateDetailOrderRequest {
  qty?: number;
  subtotal_price?: number;
}

export type DetailOrderResponse = DetailOrder;
export type DetailOrderWithRelationsResponse = DetailOrderWithRelations;
export type DetailOrdersResponse = DetailOrder[];
export type DetailOrdersWithRelationsResponse = DetailOrderWithRelations[];
