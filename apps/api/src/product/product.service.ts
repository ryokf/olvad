import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create.dto';
import { UpdateProductDto } from './dto/update.dto';
import { Product, ProductDetail } from '@olvad/types';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllProduct(): Promise<Array<Product>> {
        const products = await this.prisma.product.findMany({
            select: {
                id: true,
                name: true,
                categoryId: true,
                photo: true,
                price: true,
                tags: true,
                category: true,
            },
        });

        return products;
    }

    async getProductById(id: number): Promise<ProductDetail> {
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

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async createProduct(data: CreateProductDto): Promise<Product> {
        try {
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
                },
            });

            return product;
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    async editProduct(id: number, data: UpdateProductDto): Promise<Product> {
        try {
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
        } catch (error) {
            this.handlePrismaError(error, id);
        }
    }

    async deleteProduct(id: number): Promise<Product> {
        try {
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
        } catch (error) {
            this.handlePrismaError(error, id);
        }
    }

    private handlePrismaError(error: any, id?: number): never {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                throw new BadRequestException(
                    'Category ID tidak valid atau referensi data salah',
                );
            }
            if (error.code === 'P2025') {
                throw new NotFoundException(
                    `Product dengan ID ${id} tidak ditemukan`,
                );
            }
        }

        console.error(error);
        throw new InternalServerErrorException(
            'Terjadi kesalahan internal server',
        );
    }
}
