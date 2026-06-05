import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Request,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.dto';
import { UpdateOrderDto } from './dto/update.dto';
import { Order } from '@olvad/types';
import { createRoleGuard } from '../common/guards/auth.guard';

const UPLOAD_DIR = './uploads/receipts';

// Pastikan folder upload tersedia saat modul diload
if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true });
}

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    /**
     * Get all orders - Restricted to admin, cashier, and KDS
     * Requires x-user-role header with one of: admin, cashier, kds
     */
    @Get('/')
    @UseGuards(createRoleGuard(['admin', 'cashier', 'kds']))
    async getAllOrders(): Promise<Array<Order>> {
        const orders = await this.orderService.getAllOrders();
        return orders;
    }

    /**
     * Get orders by user ID - User can only see their own orders
     */
    @Get('/user/:userId')
    async getOrdersByUserId(
        @Param('userId', ParseIntPipe) userId: number,
        @Request() req: any,
    ): Promise<Array<Order>> {
        // Allow user to see only their own orders, unless they're admin/cashier
        const requestingUserId = req.userId;
        const userRole = req.userRole;

        if (userRole !== 'admin' && userRole !== 'cashier' && requestingUserId !== userId) {
            throw new BadRequestException('You can only view your own orders');
        }

        const orders = await this.orderService.getOrdersByUserId(userId);
        return orders;
    }

    /**
     * Get order by ID - Anyone can view order details using the order ID
     */
    @Get('/:id')
    async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        const order = await this.orderService.getOrderById(id);
        return order;
    }

    /**
     * Create order - Open to everyone (guest checkout)
     */
    @Post('/')
    async createOrder(@Body() data: CreateOrderDto): Promise<Order> {
        const order = await this.orderService.createOrder(data);
        return order;
    }

    /**
     * Update order - Restricted to admin, cashier, and KDS
     * Used for changing order status, payment status, etc.
     * Requires x-user-role header with one of: admin, cashier, kds
     */
    @Put('/:id')
    @UseGuards(createRoleGuard(['admin', 'cashier', 'kds']))
    async updateOrder(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateOrderDto,
    ): Promise<Order> {
        const order = await this.orderService.updateOrder(id, data);
        return order;
    }

    /**
     * Upload payment proof - Open to everyone (customer uploads transfer receipt)
     * Accepts multipart/form-data with field name "file"
     */
    @Patch('/:id/upload-proof')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: UPLOAD_DIR,
                filename: (_req, file, cb) => {
                    const uniqueSuffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `receipt-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (_req, file, cb) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
                    return cb(
                        new BadRequestException(
                            'Hanya file gambar (jpg, jpeg, png, webp) yang diizinkan',
                        ),
                        false,
                    );
                }
                cb(null, true);
            },
            limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
        }),
    )
    async uploadProof(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Order> {
        if (!file) {
            throw new BadRequestException('File bukti transfer tidak ditemukan');
        }
        const fileUrl = `/uploads/receipts/${file.filename}`;
        return this.orderService.uploadPaymentProof(id, fileUrl);
    }

    /**
     * Verify payment - Restricted to admin and cashier
     * Changes paymentStatus from AWAITING_VERIFICATION to PAID
     */
    @Patch('/:id/verify-payment')
    @UseGuards(createRoleGuard(['admin', 'cashier']))
    async verifyPayment(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return this.orderService.updateOrder(id, { paymentStatus: 'PAID' } as any);
    }

    /**
     * Delete order - Restricted to admin only
     * Requires x-user-role header = admin
     */
    @Delete('/:id')
    @UseGuards(createRoleGuard(['admin']))
    async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        const order = await this.orderService.deleteOrder(id);
        return order;
    }
}
