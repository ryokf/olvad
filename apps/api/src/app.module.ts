import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads',
        }),
        UserModule,
        ProductModule,
        DatabaseModule,
        CategoryModule,
        ProductVariantModule,
        OrderModule,
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

