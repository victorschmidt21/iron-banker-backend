import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryItemModel } from 'generated/prisma/models/CategoryItem';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategories(): Promise<CategoryItemModel[]> {
    return this.prisma.categoryItem.findMany();
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: CurrentUserDto,
  ): Promise<CategoryEntity> {
    return this.prisma.categoryItem.create({
      data: {
        name: createCategoryDto.name,
        userId: user.userId,
      },
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
