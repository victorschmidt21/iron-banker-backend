import { Agent } from '@mastra/core/agent';
import z from 'zod';
import { PaymentMethod } from 'generated/prisma/enums';
import { instructions } from './instructions';
import { DeepgramVoice } from '@mastra/voice-deepgram';

export class ExpenseAgent {
  agent: Agent;

  constructor() {
    const voice = new DeepgramVoice();
    this.agent = new Agent({
      name: 'Expense Agent',
      instructions: instructions,
      model: 'groq/openai/gpt-oss-120b',
    });
  }

  async receivedMessage(message: string, categories: string[]) {
    return await this.agent.generate(message, {
      structuredOutput: {
        schema: z.object({
          priceTotal: z.number().describe('Total price of the expense'),
          paymentMethod: z
            .enum(PaymentMethod)
            .describe('Payment method used in the expense'),
          items: z.array(
            z.object({
              name: z.string().describe('Item purchased in the expense'),
              quantity: z.number().describe('Quantity of the item purchased'),
              price: z.number().describe('Price of the item purchased'),
              category: z
                .string()
                .describe(
                  `Category of the item purchased [${categories.join(', ')}]`,
                ),
            }),
          ),

          resumeWhatsapp: z
            .string()
            .describe(
              'NOVA DESPESA\n_________________\nValor total: R$ 25,00\nForma de pagamento: Crédito\n_________________\nITENS\n_________________\nShampoo - 2un - R$ 10,00un - R$ 20,00',
            ),
        }),
      },
    });
  }
}
