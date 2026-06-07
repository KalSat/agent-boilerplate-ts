import { createAgent } from 'langchain'
import { SYSTEM_PROMPT } from './prompts.js'
import { smallFastLlm } from '../../shared/llms.js'
import { tools } from './tools'

/**
 * The calculator agent instance.
 *
 * Uses createAgent from LangChain, which provides:
 * - A simpler interface for building agents
 * - Built-in middleware support for customization
 * - Automatic tool binding and execution
 * - Runs on LangGraph for durable execution
 *
 * @example
 * ```typescript
 * const result = await agent.invoke({
 *   messages: [{ role: "user", content: "What's 2 + 2?" }],
 * });
 * console.log(result.content);
 * ```
 */
export function createCalculatorAgent() {
  return createAgent({
    // The model to use - supports "provider:model" format
    model: smallFastLlm,

    // System prompt defining agent behavior
    systemPrompt: SYSTEM_PROMPT,

    // Tools available to the agent
    tools,

    // Optional: Add middleware for advanced customization
    // middleware: [
    //   summarizationMiddleware({
    //     model: "anthropic:claude-haiku-4-5",
    //     trigger: { tokens: 4000 },
    //   }),
    //   humanInTheLoopMiddleware({
    //     interruptOn: { sensitive_tool: { allowedDecisions: ["approve", "reject"] } },
    //   }),
    // ],
  })
}
