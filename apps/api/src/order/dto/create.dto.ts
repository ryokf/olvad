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
    @IsNotEmpty()
    @IsInt()
    userId!: number;

    @IsNotEmpty()
    @IsEnum(OrderType)
    type!: OrderType;

    @IsOptional()
    @IsString()
    message?: string;

    @IsNotEmpty()
    @IsEnum(PaymentMethod)
    paymentMethod!: PaymentMethod;

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
