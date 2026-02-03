import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/user')
export class UserController {
    constructor(private prisma: PrismaService) {}

    @Get('/')
    async createUser() {
        await this.prisma.user.create({
            data: {
                name: 'John Doe',
                email: 'john.doe@example.com',
            },
        });

        return 'Hello Users';
    }
}
