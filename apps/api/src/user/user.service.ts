import { Injectable } from '@nestjs/common';
import { User } from '../generated/prisma/client';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async register(data: RegisterDto): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                photo: data.photo,
                address: data.address,
                password: data.password,
            },
        });

        return user;
    }
}
