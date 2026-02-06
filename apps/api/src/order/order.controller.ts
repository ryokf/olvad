import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create.dto';
import { UpdateOrderDto } from './dto/update.dto';
import { Order } from '../generated/prisma/client';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('/')
    async getAllOrders(): Promise<Array<Order>> {
        const orders = await this.orderService.getAllOrders();
        return orders;
    }

    @Get('/user/:userId')
    async getOrdersByUserId(
        @Param('userId', ParseIntPipe) userId: number,
    ): Promise<Array<Order>> {
        const orders = await this.orderService.getOrdersByUserId(userId);
        return orders;
    }

    @Get('/:id')
    async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        const order = await this.orderService.getOrderById(id);
        return order;
    }

    @Post('/')
    async createOrder(@Body() data: CreateOrderDto): Promise<Order> {
        const order = await this.orderService.createOrder(data);
        return order;
    }

    @Put('/:id')
    async updateOrder(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateOrderDto,
    ): Promise<Order> {
        const order = await this.orderService.updateOrder(id, data);
        return order;
    }

    @Delete('/:id')
    async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        const order = await this.orderService.deleteOrder(id);
        return order;
    }
}
