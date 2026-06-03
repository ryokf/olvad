import { IsOptional, IsEnum, IsString } from 'class-validator';
import {
    OrderType,
    PaymentMethod,
    PaymentStatus,
    OrderStatus,
} from '../../generated/prisma/client';

export class UpdateOrderDto {
    @IsOptional()
    @IsEnum(OrderType)
    type?: OrderType;

    @IsOptional()
    @IsString()
    tableNumber?: string;

    @IsOptional()
    @IsString()
    pickupTime?: string;

    @IsOptional()
    @IsString()
    deliveryAddress?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod?: PaymentMethod;

    @IsOptional()
    @IsEnum(PaymentStatus)
    paymentStatus?: PaymentStatus; // For updating payment status

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;
}
