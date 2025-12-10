import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EvolutionApiIntegration } from '../integrations/evolution-api';
import { MessageSendRequest } from '../integrations/evolution-api/message/message.interface';
import type { sendMessageDto } from 'src/dto/sendmessage.dto';
import { PaymentMethod } from 'generated/prisma/enums';
import { mastra } from '../mastra';
import { z } from 'zod';
import ca from 'zod/v4/locales/ca.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('agent')
  // async sendMessage(@Body() body: sendMessageDto): Promise<any> {
  //   const message = body.data.message.conversation;
  //   const agent = mastra.getAgent('expenseAgent');
  //   const result = await agent.generate(message, {
  //     structuredOutput: {
  //       schema: z.object({
  //         priceTotal: z.number().describe('Total price of the expense'),
  //         paymentMethod: z
  //           .enum(PaymentMethod)
  //           .describe('Payment method used in the expense'),
  //         items: z.array(
  //           z.object({
  //             name: z.string().describe('Item purchased in the expense'),
  //             quantity: z.number().describe('Quantity of the item purchased'),
  //             price: z.number().describe('Price of the item purchased'),
  //             category: z
  //               .string()
  //               .describe(
  //                 'Category of the item purchased [alimentação, higiene, moradia, transporte, saúde, educação, lazer, vestuário, outros]',
  //               ),
  //           }),
  //         ),

  //         resumeWhatsapp: z
  //           .string()
  //           .describe('A brief summary of the whatsapp message'),
  //       }),
  //     },
  //   });

  //   return result.object;
  // }

  @Get()
  async getHello(): Promise<string> {
    

    return "Hello Word";
  }
}
