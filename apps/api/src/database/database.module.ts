import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    controllers: [DatabaseController],
    imports: [PrismaModule],
})
export class DatabaseModule {}
