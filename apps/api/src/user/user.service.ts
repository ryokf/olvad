import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '../generated/prisma/client';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from '@olvad/types';
import { LoginRequestDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(data: RegisterDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        try {
            const user = await this.prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    photo: data.photo,
                    address: data.address,
                    password: hashedPassword,
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

    async login(data: LoginRequestDto): Promise<AuthResponse> {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new UnauthorizedException(
                'Email yang anda masukkan tidak terdaftar',
            );
        }

        const isPasswordValid = await bcrypt.compare(
            data.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException(
                'Password yang anda masukkan tidak sesuai',
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;

        const payload = userWithoutPassword;
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: userWithoutPassword,
        };
    }
}
