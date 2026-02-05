import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create.dto';
import { UpdateProductRequest } from '@olvad/types'; // Interface Shared

// PartialType otomatis mewarisi validasi dari CreateProductDto
// tapi menambahkan rule @IsOptional() ke semua field.
export class UpdateProductDto
    extends PartialType(CreateProductDto)
    implements UpdateProductRequest {}
