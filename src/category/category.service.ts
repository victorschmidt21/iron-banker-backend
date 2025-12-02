import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryItemModel } from 'generated/prisma/models/CategoryItem';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategories(): Promise<CategoryItemModel[]> {
    return this.prisma.categoryItem.findMany();
  }
}
