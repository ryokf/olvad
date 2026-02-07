import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@olvad/types';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Baca token dari Header Authorization
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secretKeyFallback',
        });
    }

    // Jika token valid, function ini jalan & menyisipkan data ke `req.user`
    validate(payload: User) {
        return {
            id: payload.id,
            email: payload.email,
            username: payload.username,
        };
    }
}
