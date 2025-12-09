import { Controller, Post, Headers, Body, HttpException } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import type { ReceivedMessageEvolutionDto } from './dto/receivedMessageEvolution.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('received-message-evolution')
  async receivedMessageEvolution(
    @Body() receivedMessageEvolution: ReceivedMessageEvolutionDto,
    @Headers('x-apy-key') apykey: string,
  ): Promise<any> {
    if (apykey !== process.env.EVOLUTION_API_WEBHOOK_KEY || !apykey) {
      throw new HttpException('Unauthorized', 404);
    }

    return this.webhookService.receivedMessageEvolution(
      receivedMessageEvolution,
    );
  }
}
