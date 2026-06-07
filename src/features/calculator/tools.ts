import { tool } from 'langchain'
import { z } from 'zod'

export const add = tool(async ({ a, b }) => a + b, {
  name: 'add',
  description: 'Adds `a` and `b`.',
  schema: z.object({
    a: z.number().int().describe('First int'),
    b: z.number().int().describe('Second int'),
  }),
})

export const subtract = tool(async ({ a, b }) => a - b, {
  name: 'subtract',
  description: 'Subtract `b` from `a`.',
  schema: z.object({
    a: z.number().int().describe('First int'),
    b: z.number().int().describe('Second int'),
  }),
})

export const multiply = tool(async ({ a, b }) => a * b, {
  name: 'multiply',
  description: 'Multiply `a` and `b`.',
  schema: z.object({
    a: z.number().int().describe('First int'),
    b: z.number().int().describe('Second int'),
  }),
})

export const divide = tool(
  async ({ a, b }) => {
    if (b === 0) throw new Error('Division by zero is not allowed.')
    return a / b
  },
  {
    name: 'divide',
    description: 'Divide `a` by `b`.',
    schema: z.object({
      a: z.number().int().describe('First int'),
      b: z.number().int().describe('Second int'),
    }),
  },
)

export const tools = [add, subtract, multiply, divide]
