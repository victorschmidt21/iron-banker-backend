import { HttpException, Injectable } from '@nestjs/common';
import { ReceivedMessageEvolutionDto } from './dto/receivedMessageEvolution.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExpenseAgent } from 'src/mastra/agents/expense-agent';
import z from 'zod';
import { PaymentMethod } from 'generated/prisma/enums';
import { EvolutionApiIntegration } from 'src/integrations/evolution-api';

@Injectable()
export class WebhookService {
  constructor(private readonly prisma: PrismaService) {}

  async receivedMessageEvolution(
    receivedeMessage: ReceivedMessageEvolutionDto,
  ) {
    const expenseAgent = new ExpenseAgent();
    const evolutionApi = new EvolutionApiIntegration();
    const message = receivedeMessage.data.message.conversation;

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
