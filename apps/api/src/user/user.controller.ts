import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Controller('/api')
export class UserController {
    constructor(private readonly prisma: PrismaService) {}

    @Post('/register')
    async register(
        @Body('data')
        data: RegisterDto,
    ): Promise<string> {
        await this.prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                photo: data.photo,
                address: data.address,
                password: data.password,
            },
        });

        return 'Hello Users';
    }
}
