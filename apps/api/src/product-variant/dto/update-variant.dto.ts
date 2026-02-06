import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductVariantDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsBoolean()
    isSingleSelection?: boolean;
}
