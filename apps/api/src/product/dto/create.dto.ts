import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { CreateProductRequest } from '@olvad/types'; // <--- IMPORT DARI SHARED

// KATA KUNCI PENTING: "implements"
// Ini artinya: "Class ini BERJANJI akan memiliki properti yang sama persis dengan interface CreateProductRequest"
export class CreateProductDto implements CreateProductRequest {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsInt()
    categoryId!: number;

    @IsOptional()
    @IsString()
    photo?: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsString()
    tags?: string;
}
