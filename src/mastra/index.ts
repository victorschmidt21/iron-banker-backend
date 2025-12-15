import { Mastra } from '@mastra/core/mastra';
import { testWorkflow } from './workflows/test-workflow';

export const mastra = new Mastra({
  agents: {},
  workflows: {
    testWorkflow,
  },
  observability: {
    default: { enabled: true },
  },
});
