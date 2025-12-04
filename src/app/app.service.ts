import { Injectable } from '@nestjs/common';
import { mastra } from '../mastra';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const agent = mastra.getAgent('expenseAgent');
    let res = '';
    try {
      const result = await agent.generate(
        `What's the weather like in Toledo/Espanha?`,
      );
      res = result.text;
    } catch (error) {
      console.error('Agent error:', error);
    }

    return res;
  }
}
