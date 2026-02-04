import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    OrderStatus,
    OrderType,
    PaymentMethod,
} from '../generated/prisma/enums';

@Controller('/database')
export class DatabaseController {
    constructor(private readonly prisma: PrismaService) {}

    // Helper untuk pilih random item dari array
    private randomItem<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }

    // Helper untuk random number range
    private randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    @Get('/seed')
    async seed() {
        console.log('🌱 Starting Massive Seeding...');

        // ==========================================
        // 1. CLEAN UP (Hapus data lama)
        // ==========================================
        await this.prisma.$transaction([
            this.prisma.detailOrderVariant.deleteMany(),
            this.prisma.detailOrder.deleteMany(),
            this.prisma.order.deleteMany(),
            this.prisma.productVariantOption.deleteMany(),
            this.prisma.productVariant.deleteMany(),
            this.prisma.product.deleteMany(),
            this.prisma.category.deleteMany(),
            this.prisma.user.deleteMany(),
        ]);

        // ==========================================
        // 2. CREATE USERS (5 User Dummy)
        // ==========================================
        const usersData = Array.from({ length: 5 }).map((_, i) => ({
            username: `user${i + 1}`,
            email: `user${i + 1}@example.com`,
            password: 'password123', // Di real app ini harus di-hash
            address: `Jl. Raya No. ${i + 1}, Semarang`,
            photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + 1}`,
        }));

        await this.prisma.user.createMany({ data: usersData });
        const allUsers = await this.prisma.user.findMany(); // Ambil balik utk dapat ID-nya

        // ==========================================
        // 3. CREATE MENU (Categories -> Products -> Variants)
        // ==========================================

        // --- Kategori: Coffee ---
        await this.prisma.category.create({
            data: {
                name: 'Coffee',
                products: {
                    create: [
                        {
                            name: 'Kopi Susu Gula Aren',
                            description: 'Signature coffee with palm sugar',
                            price: 18000,
                            photo: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    {
                                        name: 'Size',
                                        isSingleSelection: true,
                                        options: {
                                            create: [
                                                {
                                                    name: 'Regular',
                                                    addPrice: 0,
                                                },
                                                {
                                                    name: 'Large',
                                                    addPrice: 5000,
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        name: 'Sugar',
                                        isSingleSelection: true,
                                        options: {
                                            create: [
                                                { name: 'Normal', addPrice: 0 },
                                                { name: 'Less', addPrice: 0 },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            name: 'Americano',
                            description: 'Espresso with water',
                            price: 15000,
                            photo: 'https://images.unsplash.com/photo-1551024601-bec045bd703c?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    {
                                        name: 'Temperature',
                                        isSingleSelection: true,
                                        options: {
                                            create: [
                                                { name: 'Hot', addPrice: 0 },
                                                { name: 'Ice', addPrice: 2000 },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        });

        // --- Kategori: Heavy Meal ---
        await this.prisma.category.create({
            data: {
                name: 'Heavy Meal',
                products: {
                    create: [
                        {
                            name: 'Nasi Goreng Spesial',
                            description: 'Nasi goreng dengan telur dan ayam',
                            price: 25000,
                            photo: 'https://images.unsplash.com/photo-1603133872878-684f57143854?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    {
                                        name: 'Level Pedas',
                                        isSingleSelection: true,
                                        options: {
                                            create: [
                                                {
                                                    name: 'Tidak Pedas',
                                                    addPrice: 0,
                                                },
                                                { name: 'Sedang', addPrice: 0 },
                                                {
                                                    name: 'Pedas Mampus',
                                                    addPrice: 2000,
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        name: 'Topping',
                                        isSingleSelection: false, // Bisa pilih banyak
                                        options: {
                                            create: [
                                                {
                                                    name: 'Telur Ceplok',
                                                    addPrice: 3000,
                                                },
                                                {
                                                    name: 'Kerupuk',
                                                    addPrice: 1000,
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            name: 'Mie Goreng Jawa',
                            description: 'Mie goreng bumbu desa',
                            price: 22000,
                            photo: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=300',
                            variants: { create: [] }, // Tanpa varian
                        },
                    ],
                },
            },
        });

        // Ambil semua produk & varian lengkap untuk proses ordering
        const allProducts = await this.prisma.product.findMany({
            include: { variants: { include: { options: true } } },
        });

        // ==========================================
        // 4. CREATE TRANSACTIONS (10 Order Random)
        // ==========================================

        // Loop 10 kali untuk membuat 10 order
        for (let i = 0; i < 10; i++) {
            const randomUser = this.randomItem(allUsers);
            const randomProduct = this.randomItem(allProducts);
            const orderQty = this.randomNumber(1, 3);

            // Hitung harga varian
            let variantTotalPrice = 0;
            const selectedVariantOptionsIds: number[] = [];

            // Pilih 1 opsi secara acak untuk setiap varian produk (simulasi user milih)
            if (randomProduct.variants.length > 0) {
                randomProduct.variants.forEach((variant) => {
                    if (variant.options.length > 0) {
                        const randomOption = this.randomItem(variant.options);
                        selectedVariantOptionsIds.push(randomOption.id);
                        variantTotalPrice += randomOption.addPrice;
                    }
                });
            }

            const subtotalPerItem = randomProduct.price + variantTotalPrice;
            const totalOrderPrice = subtotalPerItem * orderQty;

            await this.prisma.order.create({
                data: {
                    userId: randomUser.id,
                    type: this.randomItem(Object.values(OrderType)), // Random Type
                    paymentMethod: this.randomItem(
                        Object.values(PaymentMethod),
                    ), // Random Payment
                    status: this.randomItem(Object.values(OrderStatus)), // Random Status
                    totalPrice: totalOrderPrice,
                    message: i % 3 === 0 ? 'Mohon dipercepat ya kak' : null, // Random message

                    detailOrders: {
                        create: {
                            productId: randomProduct.id,
                            qty: orderQty,
                            subtotalPrice: totalOrderPrice,
                            variants: {
                                create: selectedVariantOptionsIds.map(
                                    (optId) => ({
                                        productVariantOptionId: optId,
                                    }),
                                ),
                            },
                        },
                    },
                },
            });
        }

        console.log('✅ Seeding Complete: 5 Users, Menu, & 10 Orders created.');
        return {
            message: 'Success! Database has been populated.',
            stats: { users: 5, orders: 10, products: allProducts.length },
        };
    }
}
