import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKeyFallback',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
