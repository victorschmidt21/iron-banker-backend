import { HttpException, Injectable } from '@nestjs/common';
import {
  messageType,
  ReceivedMessageEvolutionDto,
} from './dto/receivedMessageEvolution.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExpenseAgent } from 'src/mastra/agents/expense-agent';
import { EvolutionApiIntegration } from 'src/integrations/evolution-api';
import { VoiceDeepgram } from 'src/mastra/voice/deepgram';
import { Readable } from 'stream';

@Injectable()
export class WebhookService {
  constructor(private readonly prisma: PrismaService) {}

  async receivedMessageEvolution(
    receivedeMessage: ReceivedMessageEvolutionDto,
  ) {
    const phone = receivedeMessage.data.key.remoteJid.replace(
      '@s.whatsapp.net',
      '',
    );

    const user = await this.prisma.user.findFirst({
      where: {
        phone,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const expenseAgent = new ExpenseAgent();
    const evolutionApi = new EvolutionApiIntegration();
    let message = '';

    switch (receivedeMessage.data.messageType) {
      case messageType.conversation: {
        message = receivedeMessage.data.message.conversation!;
        console.log('coversation');
        break;
      }

      case messageType.audioMessage: {
        const voice = new VoiceDeepgram();

        const response = await evolutionApi.AudioRoute.download(
          receivedeMessage.data.key.id,
        );

        const rawBase64 = response.base64.replace(/^data:.*?base64,/, '');

        const buffer = Buffer.from(rawBase64, 'base64');

        const audioStream = Readable.from(buffer);

        const transcribe = await voice.transcript(audioStream);

        message = transcribe;
        break;
      }

      default: {
        console.log('nada');
        break;
      }
    }

    const categories = await this.prisma.categoryItem.findMany({
      where: {
        userId: user.id,
      },
      select: {
        name: true,
        id: true,
      },
    });

    const result = await expenseAgent.receivedMessage(
      message,
      categories.map((cat) => cat.name),
    );

    await evolutionApi.MessageRoute.sendMessage({
      text: result.object.resumeWhatsapp,
      number: phone,
      options: {
        delay: 5,
      },
    });

    const expense = await this.prisma.expense.create({
      data: {
        userId: user.id,
        priceTotal: result.object.priceTotal,
        paymentMethod: result.object.paymentMethod,
      },
      select: {
        id: true,
      },
    });

    const itemsData = result.object.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      categoryId: categories.find((cat) => cat.name === item.category)!.id,
      expenseId: expense.id,
    }));

    const items = await this.prisma.items.createMany({
      data: itemsData,
    });

    return items;
  }
}
