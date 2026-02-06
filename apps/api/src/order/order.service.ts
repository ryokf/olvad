import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create.dto';
import { UpdateOrderDto } from './dto/update.dto';
import { Prisma } from '../generated/prisma/client';
import { Order } from '@olvad/types';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllOrders(): Promise<Array<Order>> {
        const orders = await this.prisma.order.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        photo: true,
                        address: true,
                    },
                },
                detailOrders: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                photo: true,
                                price: true,
                            },
                        },
                        variants: {
                            include: {
                                productVariantOption: {
                                    include: {
                                        variant: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });

        return orders;
    }

    async getOrdersByUserId(userId: number): Promise<Array<Order>> {
        const orders = await this.prisma.order.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        photo: true,
                        address: true,
                    },
                },
                detailOrders: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                photo: true,
                                price: true,
                            },
                        },
                        variants: {
                            include: {
                                productVariantOption: {
                                    include: {
                                        variant: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });

        return orders;
    }

    async getOrderById(id: number): Promise<Order> {
        const order = await this.prisma.order.findUnique({
            where: {
                id: id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        photo: true,
                        address: true,
                    },
                },
                detailOrders: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                photo: true,
                                price: true,
                                categoryId: true,
                                category: true,
                            },
                        },
                        variants: {
                            include: {
                                productVariantOption: {
                                    include: {
                                        variant: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        return order;
    }

    async createOrder(data: CreateOrderDto): Promise<Order> {
        try {
            const order = await this.prisma.order.create({
                data: {
                    userId: data.userId,
                    type: data.type,
                    message: data.message,
                    paymentMethod: data.paymentMethod,
                    totalPrice: data.totalPrice,
                    status: data.status,
                    detailOrders: {
                        create: data.detailOrders.map((detail) => ({
                            productId: detail.productId,
                            qty: detail.qty,
                            subtotalPrice: detail.subtotalPrice,
                            variants: detail.variantOptionIds
                                ? {
                                      create: detail.variantOptionIds.map(
                                          (optionId) => ({
                                              productVariantOptionId: optionId,
                                          }),
                                      ),
                                  }
                                : undefined,
                        })),
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            photo: true,
                            address: true,
                        },
                    },
                    detailOrders: {
                        include: {
                            product: true,
                            variants: {
                                include: {
                                    productVariantOption: {
                                        include: {
                                            variant: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            return order;
        } catch (error) {
            this.handlePrismaError(error);
        }
    }

    async updateOrder(id: number, data: UpdateOrderDto): Promise<Order> {
        try {
            const order = await this.prisma.order.update({
                where: {
                    id,
                },
                data: {
                    type: data.type,
                    message: data.message,
                    paymentMethod: data.paymentMethod,
                    status: data.status,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            photo: true,
                            address: true,
                        },
                    },
                    detailOrders: {
                        include: {
                            product: true,
                            variants: {
                                include: {
                                    productVariantOption: {
                                        include: {
                                            variant: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            return order;
        } catch (error) {
            this.handlePrismaError(error, id);
        }
    }

    async deleteOrder(id: number): Promise<Order> {
        try {
            // First delete all detail order variants
            await this.prisma.detailOrderVariant.deleteMany({
                where: {
                    detailOrder: {
                        orderId: id,
                    },
                },
            });

            // Then delete all detail orders
            await this.prisma.detailOrder.deleteMany({
                where: {
                    orderId: id,
                },
            });

            // Finally delete the order
            const order = await this.prisma.order.delete({
                where: {
                    id: id,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                        },
                    },
                    detailOrders: true,
                },
            });

            return order;
        } catch (error) {
            this.handlePrismaError(error, id);
        }
    }

    private handlePrismaError(error: any, id?: number): never {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                throw new BadRequestException(
                    'User ID, Product ID, atau Variant Option ID tidak valid',
                );
            }
            if (error.code === 'P2025') {
                throw new NotFoundException(
                    `Order dengan ID ${id} tidak ditemukan`,
                );
            }
        }

        console.error(error);
        throw new InternalServerErrorException(
            'Terjadi kesalahan internal server',
        );
    }
}
