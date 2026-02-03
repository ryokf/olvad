import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, User } from '../generated/prisma/client';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async register(data: RegisterDto): Promise<User> {
        try {
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
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(
                        'Username or email already exists',
                    );
                }
            }
            throw new InternalServerErrorException();
        }
    }
}
