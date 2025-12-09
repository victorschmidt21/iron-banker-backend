import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [WebhookService],
  controllers: [WebhookController],
  imports: [PrismaModule],
})
export class WebhookModule {}
