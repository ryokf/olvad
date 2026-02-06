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
import { ProductVariantService } from './product-variant.service';
import { CreateProductVariantDto } from './dto/create-variant.dto';
import { UpdateProductVariantDto } from './dto/update-variant.dto';
import { CreateProductVariantOptionDto } from './dto/create-option.dto';
import { UpdateProductVariantOptionDto } from './dto/update-option.dto';
import { ProductVariant, ProductVariantOption } from '@olvad/types';

@Controller('product-variant')
export class ProductVariantController {
    constructor(
        private readonly productVariantService: ProductVariantService,
    ) {}

    // ==================== PRODUCT VARIANT ENDPOINTS ====================

    @Get('/')
    async getAllVariants(): Promise<Array<ProductVariant>> {
        const variants = await this.productVariantService.getAllVariants();
        return variants;
    }

    @Get('/product/:productId')
    async getVariantsByProductId(
        @Param('productId', ParseIntPipe) productId: number,
    ): Promise<Array<ProductVariant>> {
        const variants =
            await this.productVariantService.getVariantsByProductId(productId);
        return variants;
    }

    @Get('/:id')
    async getVariantById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ProductVariant> {
        const variant = await this.productVariantService.getVariantById(id);
        return variant;
    }

    @Post('/')
    async createVariant(
        @Body() data: CreateProductVariantDto,
    ): Promise<ProductVariant> {
        const variant = await this.productVariantService.createVariant(data);
        return variant;
    }

    @Put('/:id')
    async updateVariant(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateProductVariantDto,
    ): Promise<ProductVariant> {
        const variant = await this.productVariantService.updateVariant(
            id,
            data,
        );
        return variant;
    }

    @Delete('/:id')
    async deleteVariant(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ProductVariant> {
        const variant = await this.productVariantService.deleteVariant(id);
        return variant;
    }

    // ==================== PRODUCT VARIANT OPTION ENDPOINTS ====================

    @Get('/option/all')
    async getAllOptions(): Promise<Array<ProductVariantOption>> {
        const options = await this.productVariantService.getAllOptions();
        return options;
    }

    @Get('/:variantId/option')
    async getOptionsByVariantId(
        @Param('variantId', ParseIntPipe) variantId: number,
    ): Promise<Array<ProductVariantOption>> {
        const options =
            await this.productVariantService.getOptionsByVariantId(variantId);
        return options;
    }

    @Get('/option/:id')
    async getOptionById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ProductVariantOption> {
        const option = await this.productVariantService.getOptionById(id);
        return option;
    }

    @Post('/option')
    async createOption(
        @Body() data: CreateProductVariantOptionDto,
    ): Promise<ProductVariantOption> {
        const option = await this.productVariantService.createOption(data);
        return option;
    }

    @Put('/option/:id')
    async updateOption(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateProductVariantOptionDto,
    ): Promise<ProductVariantOption> {
        const option = await this.productVariantService.updateOption(id, data);
        return option;
    }

    @Delete('/option/:id')
    async deleteOption(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ProductVariantOption> {
        const option = await this.productVariantService.deleteOption(id);
        return option;
    }
}
