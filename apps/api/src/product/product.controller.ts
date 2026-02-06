import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.dto';
import { UpdateProductDto } from './dto/update.dto';
import { Product } from '@olvad/types';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/')
    async getAllProducts(): Promise<Array<Product>> {
        const products = await this.productService.getAllProduct();

        return products;
    }

    @Get('/:id')
    async getProductById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Product | null> {
        const product = await this.productService.getProductById(id);

        return product;
    }

    @Post('/')
    async createProduct(@Body() data: CreateProductDto): Promise<Product> {
        const product = await this.productService.createProduct(data);

        return product;
    }

    @Put('/:id')
    async editProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateProductDto,
    ): Promise<Product> {
        const product = await this.productService.editProduct(id, data);

        return product;
    }

    @Delete('/:id')
    async deleteProduct(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Product> {
        const product = await this.productService.deleteProduct(id);

        return product;
    }
}
