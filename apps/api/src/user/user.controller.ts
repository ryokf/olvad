import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('/user')
export class UserController {
    constructor(private readonly prisma: PrismaService) {}

    @Get('/')
    async getUsers() {
        return await this.prisma.user.findMany();
    }

    @Post('/')
    async createUser(@Body() data: { name: string; email: string }) {
        return await this.prisma.user.create({
            data,
        });
    }
}
