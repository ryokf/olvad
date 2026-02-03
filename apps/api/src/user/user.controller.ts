import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

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
}
