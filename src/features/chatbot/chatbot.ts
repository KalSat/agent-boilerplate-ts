import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { smallFastLlm } from '../../shared/llms'
import { PROMPTS } from './prompts'

export async function testChatbot() {
  const readlineInterface = readline.createInterface({ input, output })

  console.log('聊天机器人启动...')
  let messages: BaseMessage[] = [new SystemMessage({ content: PROMPTS['concise'] })]

  console.log("输入 'exit' 退出对话。")
  while (true) {
    const userInput = await readlineInterface.question('用户: ')
    if (userInput.toLowerCase() === 'exit') {
      console.log('聊天机器人已退出。')
      break
    }

    messages.push(new HumanMessage({ content: userInput }))

    process.stdout.write('机器人: \n')
    let fullReply = ''
    for await (const chunk of await smallFastLlm.stream(messages)) {
      if (chunk.content && typeof chunk.content === 'string') {
        process.stdout.write(chunk.content)
        fullReply += chunk.content
      }
    }

    console.log('\n' + '-'.repeat(40))

    messages.push(new AIMessage(fullReply))

    messages = messages.slice(-10)
  }
  readlineInterface.close()
}
