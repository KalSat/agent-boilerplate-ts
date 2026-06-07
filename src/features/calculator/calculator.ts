import { AIMessage, type BaseMessage, HumanMessage } from '@langchain/core/messages'
import { createCalculatorAgent } from './agent.js'

export async function testCalculator(): Promise<void> {
  const agentGraph = createCalculatorAgent()
  const userQuery = '请计算123×456+800÷2。'
  await runExecutionLoop(agentGraph, userQuery)
}

async function runExecutionLoop(
  reactAgent: ReturnType<typeof createCalculatorAgent>,
  query: string,
): Promise<void> {
  console.log(`\n>>> User Query: ${query}\n`)

  try {
    const stream = await reactAgent.stream(
      { messages: [new HumanMessage(query)] },
      // streamMode: 'updates' —— 节点级流式：每当某个节点完成执行并更新 state 后，推送一个 chunk（包含该节点对 state 的变更），
      // 每条 message 均为完整消息；若改为 'values'，则每次推送完整的全量 state。
      { streamMode: 'updates' },
    )
    for await (const chunk of stream) {
      for (const [nodeName, update] of Object.entries(chunk)) {
        const messages = (update as { messages?: BaseMessage[] }).messages
        if (messages) {
          console.log(`--- [${nodeName}] ---`)
          for (const m of messages) {
            printMessage(m)
          }
        }
      }
    }
    console.log('==============================')
  } catch (e) {
    console.error('Error during execution:', e)
  }
}

function printMessage(m: BaseMessage): void {
  const role = m.type
  const content = typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
  if (m instanceof AIMessage && m.tool_calls?.length) {
    const toolCallsStr = m.tool_calls
      .map((tc) => `${tc.name}(${JSON.stringify(tc.args)})`)
      .join(', ')
    console.log(`[${role}]: ${content || '(calling tools)'} -> ${toolCallsStr}`)
  } else {
    console.log(`[${role}]: ${content}`)
  }
}
