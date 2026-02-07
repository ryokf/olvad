import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { LoginRequestDto } from './dto/login.dto';
import { AuthResponse } from '@olvad/types';

@Controller('/api')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    async register(
        @Body('data')
        data: RegisterDto,
    ): Promise<string> {
        await this.userService.register(data);

        return 'User registered successfully';
    }

    @Post('/login')
    async login(@Body() data: LoginRequestDto): Promise<AuthResponse> {
        return await this.userService.login(data);
    }
}
