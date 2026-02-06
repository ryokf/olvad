import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateProductVariantOptionDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    addPrice?: number;
}
