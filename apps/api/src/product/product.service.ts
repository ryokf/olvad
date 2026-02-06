import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create.dto';
import { UpdateProductDto } from './dto/update.dto';
import { Product } from '@olvad/types';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllProduct(): Promise<Array<Product>> {
        const products = await this.prisma.product.findMany({
            include: {
                category: true,
                variants: {
                    include: {
                        options: true,
                    },
                },
            },
        });

        return products;
    }

    async getProductById(id: number): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({
            where: {
                id: id,
            },
            include: {
                category: true,
                variants: {
                    include: {
                        options: true,
                    },
                },
            },
        });

        return product;
    }

    async createProduct(data: CreateProductDto): Promise<Product> {
        const product = await this.prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                photo: data.photo,
                price: data.price,
                tags: data.tags,
            },
            include: {
                category: true,
                variants: {
                    include: {
                        options: true,
                    },
                },
            },
        });

        return product;
    }

    async editProduct(id: number, data: UpdateProductDto): Promise<Product> {
        const product = await this.prisma.product.update({
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
            include: {
                category: true,
                variants: {
                    include: {
                        options: true,
                    },
                },
            },
        });

        return product;
    }

    async deleteProduct(id: number): Promise<Product> {
        const product = await this.prisma.product.delete({
            where: {
                id: id,
            },
            include: {
                category: true,
                variants: {
                    include: {
                        options: true,
                    },
                },
            },
        });

        return product;
    }
}
