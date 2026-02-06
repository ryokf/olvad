import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductVariantDto } from './dto/create-variant.dto';
import { UpdateProductVariantDto } from './dto/update-variant.dto';
import { CreateProductVariantOptionDto } from './dto/create-option.dto';
import { UpdateProductVariantOptionDto } from './dto/update-option.dto';
import { Prisma } from '../generated/prisma/client';
import { ProductVariant, ProductVariantOption } from '@olvad/types';

@Injectable()
export class ProductVariantService {
    constructor(private readonly prisma: PrismaService) {}

    // ==================== PRODUCT VARIANT METHODS ====================

    async getAllVariants(): Promise<Array<ProductVariant>> {
        const variants = await this.prisma.productVariant.findMany({
            include: {
                product: true,
                options: true,
            },
            orderBy: {
                id: 'asc',
            },
        });

        return variants;
    }

    async getVariantsByProductId(
        productId: number,
    ): Promise<Array<ProductVariant>> {
        const variants = await this.prisma.productVariant.findMany({
            where: {
                productId: productId,
            },
            include: {
                options: true,
            },
            orderBy: {
                id: 'asc',
            },
        });

        return variants;
    }

    async getVariantById(id: number): Promise<ProductVariant> {
        const variant = await this.prisma.productVariant.findUnique({
            where: {
                id: id,
            },
            include: {
                product: true,
                options: true,
            },
        });

        if (!variant) {
            throw new NotFoundException('Product variant not found');
        }

        return variant;
    }

    async createVariant(
        data: CreateProductVariantDto,
    ): Promise<ProductVariant> {
        try {
            const variant = await this.prisma.productVariant.create({
                data: {
                    productId: data.productId,
                    name: data.name,
                    isSingleSelection: data.isSingleSelection,
                },
                include: {
                    product: true,
                    options: true,
                },
            });

            return variant;
        } catch (error) {
            this.handlePrismaError(error, 'variant');
        }
    }

    async updateVariant(
        id: number,
        data: UpdateProductVariantDto,
    ): Promise<ProductVariant> {
        try {
            const variant = await this.prisma.productVariant.update({
                where: {
                    id,
                },
                data: {
                    name: data.name,
                    isSingleSelection: data.isSingleSelection,
                },
                include: {
                    product: true,
                    options: true,
                },
            });
            return variant;
        } catch (error) {
            this.handlePrismaError(error, 'variant', id);
        }
    }

    async deleteVariant(id: number): Promise<ProductVariant> {
        try {
            const variant = await this.prisma.productVariant.delete({
                where: {
                    id: id,
                },
                include: {
                    product: true,
                    options: true,
                },
            });

            return variant;
        } catch (error) {
            this.handlePrismaError(error, 'variant', id);
        }
    }

    // ==================== PRODUCT VARIANT OPTION METHODS ====================

    async getAllOptions(): Promise<Array<ProductVariantOption>> {
        const options = await this.prisma.productVariantOption.findMany({
            include: {
                variant: true,
            },
            orderBy: {
                id: 'asc',
            },
        });

        return options;
    }

    async getOptionsByVariantId(
        variantId: number,
    ): Promise<Array<ProductVariantOption>> {
        const options = await this.prisma.productVariantOption.findMany({
            where: {
                productVariantId: variantId,
            },
            orderBy: {
                id: 'asc',
            },
        });

        return options;
    }

    async getOptionById(id: number): Promise<ProductVariantOption> {
        const option = await this.prisma.productVariantOption.findUnique({
            where: {
                id: id,
            },
            include: {
                variant: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!option) {
            throw new NotFoundException('Product variant option not found');
        }

        return option;
    }

    async createOption(
        data: CreateProductVariantOptionDto,
    ): Promise<ProductVariantOption> {
        try {
            const option = await this.prisma.productVariantOption.create({
                data: {
                    productVariantId: data.productVariantId,
                    name: data.name,
                    addPrice: data.addPrice,
                },
                include: {
                    variant: true,
                },
            });

            return option;
        } catch (error) {
            this.handlePrismaError(error, 'option');
        }
    }

    async updateOption(
        id: number,
        data: UpdateProductVariantOptionDto,
    ): Promise<ProductVariantOption> {
        try {
            const option = await this.prisma.productVariantOption.update({
                where: {
                    id,
                },
                data: {
                    name: data.name,
                    addPrice: data.addPrice,
                },
                include: {
                    variant: true,
                },
            });
            return option;
        } catch (error) {
            this.handlePrismaError(error, 'option', id);
        }
    }

    async deleteOption(id: number): Promise<ProductVariantOption> {
        try {
            const option = await this.prisma.productVariantOption.delete({
                where: {
                    id: id,
                },
                include: {
                    variant: true,
                },
            });

            return option;
        } catch (error) {
            this.handlePrismaError(error, 'option', id);
        }
    }

    // ==================== ERROR HANDLING ====================

    private handlePrismaError(
        error: any,
        type: 'variant' | 'option',
        id?: number,
    ): never {
        const entityName =
            type === 'variant' ? 'Product variant' : 'Product variant option';

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                if (type === 'variant') {
                    throw new BadRequestException(
                        'Product ID tidak valid atau referensi data salah',
                    );
                } else {
                    throw new BadRequestException(
                        'Product Variant ID tidak valid atau referensi data salah',
                    );
                }
            }
            if (error.code === 'P2025') {
                throw new NotFoundException(
                    `${entityName} dengan ID ${id} tidak ditemukan`,
                );
            }
            if (error.code === 'P2023') {
                throw new BadRequestException(
                    'Tidak dapat menghapus variant yang masih memiliki options atau digunakan dalam order',
                );
            }
        }

        console.error(error);
        throw new InternalServerErrorException(
            'Terjadi kesalahan internal server',
        );
    }
}
