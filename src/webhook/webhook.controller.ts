import { Controller, Post, Headers, Body, HttpException } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import type { ReceivedMessageEvolutionDto } from './dto/receivedMessageEvolution.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('received-message-evolution')
  async receivedMessageEvolution(
    @Body() receivedMessageEvolution: ReceivedMessageEvolutionDto,
  ): Promise<any> {
    return this.webhookService.receivedMessageEvolution(
      receivedMessageEvolution,
    );
  }
}
