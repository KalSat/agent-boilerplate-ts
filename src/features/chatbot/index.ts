import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { qwen25InstructLlm } from '../../shared/llms'

export async function testChatbot() {
  const readlineInterface = readline.createInterface({ input, output })

  console.log('聊天机器人启动...')
  const messages: BaseMessage[] = [
    new SystemMessage({
      content: '你叫小智，是一名乐于助人的智能助手。请在对话中保持友好、有耐心、温和的语气。',
    }),
  ]

  console.log("输入 'exit' 退出对话。")
  while (true) {
    const userInput = await readlineInterface.question('用户: ')
    if (userInput.toLowerCase() === 'exit') {
      console.log('聊天机器人已退出。')
      break
    }

    messages.push(new HumanMessage({ content: userInput }))

    console.log('小智: ')
    let fullReply = ''
    for await (const chunk of await qwen25InstructLlm.stream(messages)) {
      if (chunk.content && typeof chunk.content === 'string') {
        output.write(chunk.content)
        fullReply += chunk.content
      }
    }

    console.log('\n' + '-'.repeat(40))

    messages.push(new AIMessage(fullReply))

    messages.splice(0, Math.max(0, messages.length - 10))
  }
  readlineInterface.close()
}
