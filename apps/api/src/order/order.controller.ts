import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
    Request,
    BadRequestException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.dto';
import { UpdateOrderDto } from './dto/update.dto';
import { Order } from '@olvad/types';
import { RoleGuard, createRoleGuard } from '../common/guards/auth.guard';

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

