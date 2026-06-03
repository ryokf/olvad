import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    OrderStatus,
    OrderType,
    PaymentMethod,
    PaymentStatus,
} from '../generated/prisma/enums';

@Controller('/database')
export class DatabaseController {
    constructor(private readonly prisma: PrismaService) {}

    private randomItem<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }

    private randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    @Get('/seed')
    async seed() {
        console.log('🌱 Starting Massive Seeding for Olvad Menu...');

        // ==========================================
        // 1. CLEAN UP
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
        // 2. CREATE USERS
        // ==========================================
        const usersData = Array.from({ length: 5 }).map((_, i) => ({
            username: `user${i + 1}`,
            email: `user${i + 1}@example.com`,
            password: 'password123',
            address: `Jl. Raya No. ${i + 1}, Semarang`,
            photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + 1}`,
        }));

        await this.prisma.user.createMany({ data: usersData });
        const allUsers = await this.prisma.user.findMany();

        // ==========================================
        // 3. COMMON VARIANTS TEMPLATE (Untuk kemudahan re-use)
        // ==========================================
        const tempVariant = {
            name: 'Temperature',
            isSingleSelection: true,
            options: {
                create: [
                    { name: 'Hot', addPrice: 0 },
                    { name: 'Ice', addPrice: 2000 },
                ],
            },
        };
        const sweetnessVariant = {
            name: 'Sweetness',
            isSingleSelection: true,
            options: {
                create: [
                    { name: 'Normal', addPrice: 0 },
                    { name: 'Less Sugar', addPrice: 0 },
                ],
            },
        };
        const milkVariant = {
            name: 'Milk Choice',
            isSingleSelection: true,
            options: {
                create: [
                    { name: 'Fresh Milk', addPrice: 0 },
                    { name: 'Oat Milk', addPrice: 8000 },
                ],
            },
        };
        const coffeeAddonVariant = {
            name: 'Add-ons',
            isSingleSelection: false, // Bisa pilih ekstra shot & sirup sekaligus
            options: {
                create: [
                    { name: 'Extra Shot Espresso', addPrice: 5000 },
                    { name: 'Vanilla Syrup', addPrice: 4000 },
                ],
            },
        };

        const spicyVariant = {
            name: 'Level Pedas',
            isSingleSelection: true,
            options: {
                create: [
                    { name: 'Tidak Pedas', addPrice: 0 },
                    { name: 'Sedang', addPrice: 0 },
                    { name: 'Pedas', addPrice: 0 },
                ],
            },
        };

        const pastryPrepVariant = {
            name: 'Preparation',
            isSingleSelection: true,
            options: {
                create: [
                    { name: 'Sajikan Hangat (Toasted)', addPrice: 0 },
                    { name: 'Biasa (Room Temp)', addPrice: 0 },
                ],
            },
        };

        // ==========================================
        // 4. CREATE MENU & VARIANTS
        // ==========================================

        // --- Kategori: Signature Coffee ---
        await this.prisma.category.create({
            data: {
                name: 'Signature Coffee',
                products: {
                    create: [
                        {
                            name: 'Kopi Susu Gula Aren',
                            description:
                                'Rekomendasi - Kopi susu dengan gula aren pilihan',
                            price: 28000,
                            photo: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    tempVariant,
                                    sweetnessVariant,
                                    coffeeAddonVariant,
                                ],
                            },
                        },
                        {
                            name: 'Avocado Coffee',
                            description:
                                'Rekomendasi - Perpaduan kopi dan alpukat segar',
                            price: 32000,
                            photo: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=300',
                            variants: { create: [sweetnessVariant] }, // Hanya manis/tidak
                        },
                    ],
                },
            },
        });

        // --- Kategori: Espresso Based ---
        await this.prisma.category.create({
            data: {
                name: 'Espresso Based',
                products: {
                    create: [
                        {
                            name: 'Latte Premium',
                            description:
                                'Espresso dengan steamed milk premium [cite: 23]',
                            price: 30000,
                            photo: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    tempVariant,
                                    milkVariant,
                                    coffeeAddonVariant,
                                ],
                            },
                        },
                        {
                            name: 'Cappuccino',
                            description:
                                'Classic espresso with thick foam [cite: 24]',
                            price: 30000,
                            photo: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    tempVariant,
                                    milkVariant,
                                    coffeeAddonVariant,
                                ],
                            },
                        },
                        {
                            name: 'Mocha',
                            description:
                                'Espresso, cokelat, dan susu [cite: 25]',
                            price: 30000,
                            photo: 'https://images.unsplash.com/photo-1596078841242-12f73dc697c6?auto=format&fit=crop&q=80&w=300',
                            variants: { create: [tempVariant, milkVariant] },
                        },
                        {
                            name: 'Americano',
                            description: 'Espresso dengan air [cite: 26]',
                            price: 25000,
                            photo: 'https://images.unsplash.com/photo-1551024601-bec045bd703c?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [tempVariant, coffeeAddonVariant],
                            },
                        },
                    ],
                },
            },
        });

        // --- Kategori: Non Coffee ---
        await this.prisma.category.create({
            data: {
                name: 'Non Coffee',
                products: {
                    create: [
                        {
                            name: 'Matcha Latte',
                            description:
                                'Rekomendasi - Minuman matcha kualitas premium [cite: 33]',
                            price: 30000,
                            photo: 'https://images.unsplash.com/photo-1515823662972-da6a2b4d3002?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    tempVariant,
                                    milkVariant,
                                    sweetnessVariant,
                                ],
                            },
                        },
                        {
                            name: 'Chocolate Premium',
                            description: 'Cokelat pilihan terbaik [cite: 34]',
                            price: 25000,
                            photo: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=300',
                            variants: { create: [tempVariant, milkVariant] },
                        },
                        {
                            name: 'Teh Tarik',
                            description: 'Teh tarik otentik [cite: 35]',
                            price: 22000,
                            photo: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=300',
                            variants: { create: [tempVariant] },
                        },
                    ],
                },
            },
        });

        // --- Kategori: Pastry ---
        await this.prisma.category.create({
            data: {
                name: 'Pastry',
                products: {
                    create: [
                        {
                            name: 'Butter Croissant',
                            description: 'Rekomendasi pastry renyah [cite: 41]',
                            price: 25000,
                            photo: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    pastryPrepVariant,
                                    {
                                        name: 'Extra Dip',
                                        isSingleSelection: false,
                                        options: {
                                            create: [
                                                {
                                                    name: 'Butter Curls',
                                                    addPrice: 4000,
                                                },
                                                {
                                                    name: 'Strawberry Jam',
                                                    addPrice: 5000,
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            name: 'Chocolate Croissant',
                            description:
                                'Croissant dengan isian cokelat lumer [cite: 46]',
                            price: 28000,
                            photo: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=300',
                            variants: { create: [pastryPrepVariant] },
                        },
                        {
                            name: 'Sourdough Toast',
                            description: 'Roti artisan panggang [cite: 49]',
                            price: 22000,
                            photo: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    {
                                        name: 'Spread',
                                        isSingleSelection: false,
                                        options: {
                                            create: [
                                                {
                                                    name: 'Peanut Butter',
                                                    addPrice: 5000,
                                                },
                                                {
                                                    name: 'Cream Cheese',
                                                    addPrice: 7000,
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            name: 'Banana Bread',
                            description: 'Bolu pisang klasik [cite: 62]',
                            price: 24000,
                            photo: 'https://images.unsplash.com/photo-1596541656832-c70e3ed6c5ea?auto=format&fit=crop&q=80&w=300',
                            variants: { create: [pastryPrepVariant] },
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
                            name: 'Chicken Sandwich',
                            description: 'Sandwich ayam porsi pas [cite: 54]',
                            price: 38000,
                            photo: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    {
                                        name: 'Extra',
                                        isSingleSelection: false,
                                        options: {
                                            create: [
                                                {
                                                    name: 'Extra Cheese',
                                                    addPrice: 5000,
                                                },
                                                {
                                                    name: 'Extra Chicken',
                                                    addPrice: 12000,
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            name: 'Pasta Aglio Olio',
                            description: 'Pasta klasik gaya Italia [cite: 55]',
                            price: 42000,
                            photo: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    spicyVariant,
                                    {
                                        name: 'Topping',
                                        isSingleSelection: false,
                                        options: {
                                            create: [
                                                {
                                                    name: 'Smoked Beef',
                                                    addPrice: 10000,
                                                },
                                                {
                                                    name: 'Mushroom',
                                                    addPrice: 6000,
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            name: 'Nasi Goreng Olvad',
                            description:
                                'Nasi goreng signature Olvad [cite: 58]',
                            price: 35000,
                            photo: 'https://images.unsplash.com/photo-1603133872878-684f57143854?auto=format&fit=crop&q=80&w=300',
                            variants: {
                                create: [
                                    spicyVariant,
                                    {
                                        name: 'Topping',
                                        isSingleSelection: false,
                                        options: {
                                            create: [
                                                {
                                                    name: 'Telur Mata Sapi',
                                                    addPrice: 5000,
                                                },
                                                {
                                                    name: 'Sosis',
                                                    addPrice: 6000,
                                                },
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

        const allProducts = await this.prisma.product.findMany({
            include: { variants: { include: { options: true } } },
        });

        // ==========================================
        // 5. CREATE TRANSACTIONS (30 Order dengan berbagai skenario)
        // ==========================================

        // Data dummy untuk customer names dan phone
        const customerNames = [
            'Budi Santoso',
            'Siti Rahayu',
            'Ahmad Wijaya',
            'Dewi Lestari',
            'Roni Kusuma',
            'Maya Sari',
            'Eko Suryanto',
            'Rina Wijaya',
            'Hendra Kusuma',
            'Lina Marlina',
            'Bambang Irawan',
            'Citra Dewi',
            'Doni Setiawan',
            'Eka Putri',
            'Fajri Rahman',
        ];

        const phoneNumbers = [
            '081234567890',
            '082345678901',
            '083456789012',
            '084567890123',
            '085678901234',
            '081345678902',
            '082456789013',
            '083567890124',
            '084678901235',
            '085789012346',
        ];

        const pickupTimes = ['09:00', '10:30', '12:00', '14:30', '16:00', '17:30'];
        const tableNumbers = [
            'A1',
            'A2',
            'B1',
            'B2',
            'C1',
            'C2',
            'D1',
            'D2',
        ];
        const deliveryAddresses = [
            'Jl. Gatot Subroto No. 123, Semarang',
            'Jl. Sudirman No. 45, Semarang',
            'Jl. Ahmad Yani No. 67, Semarang',
            'Jl. Imam Bonjol No. 89, Semarang',
            'Jl. Diponegoro No. 101, Semarang',
            'Jl. Pemuda No. 112, Semarang',
        ];

        for (let i = 0; i < 30; i++) {
            const randomProduct = this.randomItem(allProducts);
            const orderQty = this.randomNumber(1, 3);
            const orderType = this.randomItem(Object.values(OrderType));
            const paymentMethod = this.randomItem(Object.values(PaymentMethod));

            // 50% dengan userId, 50% guest checkout
            const randomUser = Math.random() > 0.5 ? this.randomItem(allUsers) : null;

            let variantTotalPrice = 0;
            const selectedVariantOptionsIds: number[] = [];

            // Proses simulasi user memilih varian
            if (randomProduct.variants.length > 0) {
                randomProduct.variants.forEach((variant) => {
                    if (variant.options.length > 0) {
                        if (variant.isSingleSelection) {
                            const randomOption = this.randomItem(
                                variant.options,
                            );
                            selectedVariantOptionsIds.push(randomOption.id);
                            variantTotalPrice += randomOption.addPrice;
                        } else {
                            variant.options.forEach((opt) => {
                                if (Math.random() > 0.5) {
                                    selectedVariantOptionsIds.push(opt.id);
                                    variantTotalPrice += opt.addPrice;
                                }
                            });
                        }
                    }
                });
            }

            const subtotalPerItem = randomProduct.price + variantTotalPrice;
            const totalOrderPrice = subtotalPerItem * orderQty;

            // Determine payment status: 70% paid, 30% unpaid
            const paymentStatus =
                Math.random() > 0.3 ? 'PAID' : 'UNPAID';

            // Build order data dengan conditional fields berdasarkan order type
            const orderData: any = {
                userId: randomUser?.id || null,
                customerName: this.randomItem(customerNames),
                customerPhone: this.randomItem(phoneNumbers),
                type: orderType,
                paymentMethod: paymentMethod,
                paymentStatus: paymentStatus,
                status: this.randomItem(Object.values(OrderStatus)),
                totalPrice: totalOrderPrice,
                notes:
                    i % 5 === 0
                        ? 'Tolong siapkan secepatnya, pelanggan sedang menunggu!'
                        : null,
            };

            // Add type-specific fields
            if (orderType === 'DINE_IN') {
                orderData.tableNumber = this.randomItem(tableNumbers);
            } else if (orderType === 'PICK_UP') {
                orderData.pickupTime = this.randomItem(pickupTimes);
            } else if (orderType === 'DELIVERY') {
                orderData.deliveryAddress = this.randomItem(deliveryAddresses);
            }

            await this.prisma.order.create({
                data: {
                    ...orderData,
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

        console.log(
            '✅ Seeding Complete: Users, Olvad Menu with Real Variants, & Orders created.',
        );
        return {
            message:
                'Success! Database has been populated with varied Olvad menu and realistic orders.',
            stats: { 
                users: 5, 
                orders: 30, 
                products: allProducts.length,
                notes: 'Orders include mix of guest/registered users, all order types, and payment statuses'
            },
        };
    }
}
