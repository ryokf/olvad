import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ProductController } from './controller/product/product.controller';

@Module({
  imports: [ProductModule],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
