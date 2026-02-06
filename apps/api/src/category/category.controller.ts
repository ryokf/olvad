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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';
import { Category } from '../generated/prisma/client';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('/')
    async getAllCategories(): Promise<Array<Category>> {
        const categories = await this.categoryService.getAllCategories();

        return categories;
    }

    @Get('/:id')
    async getCategoryById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Category> {
        const category = await this.categoryService.getCategoryById(id);

        return category;
    }

    @Post('/')
    async createCategory(@Body() data: CreateCategoryDto): Promise<Category> {
        const category = await this.categoryService.createCategory(data);

        return category;
    }

    @Put('/:id')
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateCategoryDto,
    ): Promise<Category> {
        const category = await this.categoryService.updateCategory(id, data);

        return category;
    }

    @Delete('/:id')
    async deleteCategory(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Category> {
        const category = await this.categoryService.deleteCategory(id);

        return category;
    }
}
