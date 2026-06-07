import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { testStructuredOutput } from './features/structuredOutput'
import { testChatbot } from './features/chatbot'
import { testCalculator } from './features/calculator'

const options: [string, () => Promise<void>][] = [
  ['聊天机器人 (流式输出)', testChatbot],
  ['电影推荐 (结构化输出)', testStructuredOutput],
  ['计算器 (工具调用)', testCalculator],
]

async function main() {
  const readlineInterface = readline.createInterface({ input, output })

  console.log('Select an option by number:')
  options.forEach((tuple, index) => {
    console.log(`${index + 1}. ${tuple[0]}`)
  })

  try {
    const answer = await readlineInterface.question('Enter choice: ')
    const choice = answer.trim()

    if (!/^\d+$/.test(choice)) {
      console.log('Invalid selection.')
      return
    }

    const idx = parseInt(choice, 10)
    if (idx < 1 || idx > options.length) {
      console.log('Invalid selection.')
      return
    }

    const tuple = options[idx - 1]

    readlineInterface.close()
    console.log(`Running ${tuple[0]}...\n`)
    await tuple[1]()
  } catch (error) {
    console.error('An error occurred:', error)
  } finally {
    readlineInterface.close()
  }
}

main().catch((err) => console.error(err))
