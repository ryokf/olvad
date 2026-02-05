import { Injectable } from '@nestjs/common';
import { Product } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create.dto';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllProduct(): Promise<Array<Product>> {
        const products = await this.prisma.product.findMany();

        return products;
    }

    async getProductById(id: number): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({
            where: {
                id: id,
            },
        });

        return product;
    }

    async createProduct(data: CreateProductDto): Promise<Product> {
        const product = this.prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                photo: data.photo,
                price: data.price,
                tags: data.tags,
            },
        });

        return product;
    }

    async editProduct(id: number, data: Product): Promise<Product> {
        const product = this.prisma.product.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                photo: data.photo,
                price: data.price,
                tags: data.tags,
            },
        });

        return product;
    }

    async deleteProduct(id: number): Promise<Product> {
        const product = await this.prisma.product.delete({
            where: {
                id: id,
            },
        });

        return product;
    }
}
