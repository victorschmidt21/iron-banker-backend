import { Mastra } from '@mastra/core/mastra';
import { expenseAgent } from './agents/expense-agent';

export const mastra = new Mastra({
  agents: { expenseAgent },
  observability: {
    default: { enabled: true },
  },
});
