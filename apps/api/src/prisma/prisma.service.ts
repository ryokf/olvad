import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private configService: ConfigService) {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        // PrismaMariaDb accepts connection string directly
        const adapter = new PrismaMariaDb(databaseUrl as string);

        super({ adapter });
    }
}
