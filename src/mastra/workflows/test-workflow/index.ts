import { createStep, createWorkflow } from '@mastra/core/workflows';
import { EvolutionApiIntegration } from '../../../integrations/evolution-api';
import z from 'zod';

const step1 = createStep({
  id: 'step-1',
  inputSchema: z.object({
    message: z.string(),
  }),
  outputSchema: z.object({
    formatted: z.string(),
  }),
  execute: async ({ inputData }) => {
    const { message } = inputData;

    return {
      formatted: message.toUpperCase(),
    };
  },
});

const step2 = createStep({
  id: 'send-message-evolution',
  inputSchema: z.object({
    formatted: z.string(),
  }),
  outputSchema: z.object({
    id_message: z.string(),
    sucess: z.boolean(),
  }),

  execute: async ({ inputData }) => {
    const evo = new EvolutionApiIntegration();
    const { formatted } = inputData;

    const response = await evo.MessageRoute.sendMessage({
      text: formatted,
      number: '5545999658439',
    });

    return {
      id_message: '123',
      sucess: true,
    };
  },
});

export const testWorkflow = createWorkflow({
  id: 'test-workflow',
  inputSchema: z.object({
    message: z.string(),
  }),
  outputSchema: z.object({
    output: z.string(),
  }),
})
  .then(step1)
  .then(step2)
  .commit();

async function runWorkflow() {
  const run = await testWorkflow.createRunAsync();

  const result = await run.start({
    inputData: {
      message: 'Hello world',
    },
  });

  console.log(result);
}

runWorkflow();
