import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';
import { Prisma } from '../generated/prisma/client';
import { Category } from '@olvad/types';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllCategories(): Promise<Array<Category>> {
        const categories = await this.prisma.category.findMany({
            orderBy: {
                id: 'asc',
            },
        });

        return categories;
    }

    async getCategoryById(id: number): Promise<Category> {
        const category = await this.prisma.category.findUnique({
            where: {
                id: id,
            },
            include: {
                products: {
                    select: {
                        id: true,
                        name: true,
                        categoryId: true,
                        category: true,
                        photo: true,
                        price: true,
                        tags: true,
                    },
                },
            },
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }

    async createCategory(data: CreateCategoryDto): Promise<Category> {
        try {
            const category = await this.prisma.category.create({
                data: {
                    name: data.name,
                },
            });

            return category;
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    async updateCategory(
        id: number,
        data: UpdateCategoryDto,
    ): Promise<Category> {
        try {
            const category = await this.prisma.category.update({
                where: {
                    id,
                },
                data: {
                    name: data.name,
                },
            });
            return category;
        } catch (error) {
            this.handlePrismaError(error, id);
        }
    }

    async deleteCategory(id: number): Promise<Category> {
        try {
            const category = await this.prisma.category.delete({
                where: {
                    id: id,
                },
            });

            return category;
        } catch (error) {
            this.handlePrismaError(error, id);
        }
    }

    private handlePrismaError(error: any, id?: number): never {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ConflictException(
                    'Category dengan nama tersebut sudah ada',
                );
            }
            if (error.code === 'P2025') {
                throw new NotFoundException(
                    `Category dengan ID ${id} tidak ditemukan`,
                );
            }
            if (error.code === 'P2003') {
                throw new ConflictException(
                    'Tidak dapat menghapus category yang masih memiliki produk',
                );
            }
        }

        console.error(error);
        throw new InternalServerErrorException(
            'Terjadi kesalahan internal server',
        );
    }
}
