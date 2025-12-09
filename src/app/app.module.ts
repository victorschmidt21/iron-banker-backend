import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from 'src/auth/auth.module';
import { WebhookModule } from 'src/webhook/webhook.module';

@Module({
  imports: [PrismaModule, CategoryModule, AuthModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
