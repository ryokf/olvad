import { RegisterRequest } from '@olvad/types'; // Import dari shared
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Class DTO mengimplementasikan Interface Shared
// Ini menjamin DTO backend 100% cocok dengan tipe data frontend
export class RegisterDto implements RegisterRequest {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    photo?: string;

    @IsOptional()
    @IsString()
    address?: string;
}
