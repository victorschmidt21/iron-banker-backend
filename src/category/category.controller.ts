import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async getCategories() {
    return await this.categoryService.getCategories();
  }

  @Post()
  async createCategory(@Body() body) {
    const name = body.name;
    return await this.categoryService.createCategory(name);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() body) {
    const name = body.name;
    return await this.categoryService.updateCategory(id, name);
  }
}
