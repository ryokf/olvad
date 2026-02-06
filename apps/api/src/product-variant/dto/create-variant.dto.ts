import { IsNotEmpty, IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateProductVariantDto {
    @IsNotEmpty()
    @IsInt()
    productId!: number;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsBoolean()
    isSingleSelection!: boolean;
}
