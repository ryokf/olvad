import {
    IsNotEmpty,
    IsInt,
    IsEnum,
    IsOptional,
    IsString,
    IsArray,
    ValidateNested,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
    OrderType,
    PaymentMethod,
    PaymentStatus,
    OrderStatus,
} from '../../generated/prisma/client';

export class DetailOrderItemDto {
    @IsNotEmpty()
    @IsInt()
    productId!: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    qty!: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    subtotalPrice!: number;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    variantOptionIds?: number[];
}

export class CreateOrderDto {
    @IsOptional()
    @IsInt()
    userId?: number; // Optional for guest checkout

    @IsNotEmpty()
    @IsString()
    customerName!: string;

    @IsNotEmpty()
    @IsString()
    customerPhone!: string;

    @IsNotEmpty()
    @IsEnum(OrderType)
    type!: OrderType;

    @IsOptional()
    @IsString()
    tableNumber?: string; // For dine-in orders

    @IsOptional()
    @IsString()
    pickupTime?: string; // For pickup orders

    @IsOptional()
    @IsString()
    deliveryAddress?: string; // For delivery orders

    @IsOptional()
    @IsString()
    notes?: string;

    @IsNotEmpty()
    @IsEnum(PaymentMethod)
    paymentMethod!: PaymentMethod;

    @IsOptional()
    @IsEnum(PaymentStatus)
    paymentStatus?: PaymentStatus; // Defaults to UNPAID in schema

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    totalPrice!: number;

    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status!: OrderStatus;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetailOrderItemDto)
    detailOrders!: DetailOrderItemDto[];
}
