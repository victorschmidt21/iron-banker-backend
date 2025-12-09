import { Mastra } from '@mastra/core/mastra';

export const mastra = new Mastra({
  agents: {},
  observability: {
    default: { enabled: true },
  },
});
