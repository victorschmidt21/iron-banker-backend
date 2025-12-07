import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCategories() {
    return await this.categoryService.getCategories();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateCategory(@Param('id') id: string, @Body() body) {
    const name = body.name;
    return await this.categoryService.updateCategory(id, name);
  }
}
