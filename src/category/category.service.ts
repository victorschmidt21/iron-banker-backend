import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryItemModel } from 'generated/prisma/models/CategoryItem';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategories(): Promise<CategoryItemModel[]> {
    return this.prisma.categoryItem.findMany();
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    
    return this.prisma.categoryItem.create({
      data: createCategoryDto,
    });
  }

  async deleteCategory(id: string): Promise<CategoryItemModel> {
    return this.prisma.categoryItem.delete({
      where: {
        id,
      },
    });
  }

  async updateCategory(id: string, name: string): Promise<CategoryItemModel> {
    return this.prisma.categoryItem.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
}
