import { Order } from '@olvad/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface CreateOrderPayload {
    userId?: number;
    customerName: string;
    customerPhone: string;
    type: 'DELIVERY' | 'PICK_UP' | 'DINE_IN';
    tableNumber?: string;
    pickupTime?: string;
    deliveryAddress?: string;
    notes?: string;
    paymentMethod: 'QRIS' | 'TRANSFER' | 'CASHIER';
    totalPrice: number;
    status: 'ON_PROCESS';
    detailOrders: Array<{
        productId: number;
        qty: number;
        subtotalPrice: number;
        variantOptionIds?: number[];
    }>;
}

export const createOrder = async (data: CreateOrderPayload): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create order');
    }

    return response.json();
};

export const getOrder = async (id: number): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/order/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }

    return response.json();
};

export const updateOrder = async (id: number, data: Partial<Order>): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/order/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update order');
    }

    return response.json();
};
