import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, CategoryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
