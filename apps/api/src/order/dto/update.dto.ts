import { IsOptional, IsEnum, IsString } from 'class-validator';
import {
    OrderType,
    PaymentMethod,
    OrderStatus,
} from '../../generated/prisma/client';

export class UpdateOrderDto {
    @IsOptional()
    @IsEnum(OrderType)
    type?: OrderType;

    @IsOptional()
    @IsString()
    message?: string;

    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod?: PaymentMethod;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;
}
