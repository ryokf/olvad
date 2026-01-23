/**
 * Order Types
 * Generated from Laravel migration: 2026_01_23_063011_create_orders_table.php
 */

import type { User } from './user';
import type { DetailOrder } from './detail-order';

export enum OrderType {
  DELIVERY = 'delivery',
  PICK_UP = 'pick-up',
}

export enum PaymentMethod {
  CASH = 'cash',
  CASHLESS = 'cashless',
}

export enum OrderStatus {
  ON_PROCESS = 'onprocess',
  DONE = 'done',
  CANCELED = 'canceled',
}

export interface Order {
  id: number;
  user_id: number;
  type: OrderType | string;
  message?: string | null;
  payment_method: PaymentMethod | string;
  total_price: number;
  status: OrderStatus | string;
  created_at: string;
  updated_at: string;
}

export interface OrderWithRelations extends Order {
  user?: User;
  details?: DetailOrder[];
}

export interface CreateOrderRequest {
  user_id: number;
  type: OrderType | string;
  message?: string;
  payment_method: PaymentMethod | string;
  total_price: number;
  status?: OrderStatus | string;
}

export interface UpdateOrderRequest {
  type?: OrderType | string;
  message?: string;
  payment_method?: PaymentMethod | string;
  total_price?: number;
  status?: OrderStatus | string;
}

export type OrderResponse = Order;
export type OrderWithRelationsResponse = OrderWithRelations;
export type OrdersResponse = Order[];
export type OrdersWithRelationsResponse = OrderWithRelations[];
