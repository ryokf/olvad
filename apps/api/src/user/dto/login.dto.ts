import { LoginRequest } from '@olvad/types';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto implements LoginRequest {
    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}
