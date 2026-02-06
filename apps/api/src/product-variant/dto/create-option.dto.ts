import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateProductVariantOptionDto {
    @IsNotEmpty()
    @IsInt()
    productVariantId!: number;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    addPrice!: number;
}
