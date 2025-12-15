import { Agent } from '@mastra/core/agent';
import z from 'zod';
import { PaymentMethod } from 'generated/prisma/enums';
import { instructions } from './instructions';
import { DeepgramVoice } from '@mastra/voice-deepgram';

export class DeciderAgent {
  agent: Agent;

  constructor() {
    this.agent = new Agent({
      name: 'Decider Agent',
      instructions: instructions,
      model: 'groq/openai/gpt-oss-120b',
    });
  }

  async getTypeMessage(message: string) {
    return await this.agent.generate(message, {
      structuredOutput: {
        schema: z.object({
          type: z
            .enum(['expense', 'consultation'])
            .describe('User message type'),
        }),
      },
    });
  }
}
