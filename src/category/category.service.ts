import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryItemModel } from 'generated/prisma/models/CategoryItem';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategories(): Promise<CategoryItemModel[]> {
    return this.prisma.categoryItem.findMany();
  }

  async createCategory(name: string): Promise<CategoryItemModel> {
    return this.prisma.categoryItem.create({
      data: {
        name,
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
