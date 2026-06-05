import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { testStructuredOutput } from './structured/testStructuredOutput'
import { testChatbot } from './chatbot/testChatbot'

const options: (() => Promise<void>)[] = [testStructuredOutput, testChatbot]

async function main() {
  const readlineInterface = readline.createInterface({ input, output })

  console.log('Select an option by number:')
  options.forEach((func, index) => {
    console.log(`${index + 1}. ${func.name}`)
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

    const func = options[idx - 1]

    readlineInterface.close()
    console.log(`Running ${func.name}...\n`)
    await func()
  } catch (error) {
    console.error('An error occurred:', error)
  } finally {
    readlineInterface.close()
  }
}

main().catch((err) => console.error(err))
