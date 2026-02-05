import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import type { Product } from '../generated/prisma/client';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/')
    async getAllProducts(): Promise<Array<Product>> {
        const products = await this.productService.getAllProduct();

        return products;
    }

    @Get('/:id')
    async getProductById(@Param('id') id: string): Promise<Product | null> {
        const product = await this.productService.getProductById(Number(id));

        return product;
    }

    @Post('/')
    async createProduct(@Body('data') data: Product): Promise<Product | null> {
        const product = await this.productService.createProduct(data);

        return product;
    }

    @Put('/:id')
    async editProduct(
        @Param('id') id: string,
        @Body('data') data: Product,
    ): Promise<Product | null> {
        const product = await this.productService.editProduct(Number(id), data);

        return product;
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: string): Promise<Product | null> {
        const product = await this.productService.deleteProduct(Number(id));

        return product;
    }
}
