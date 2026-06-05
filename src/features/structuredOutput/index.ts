import { qwen25InstructLlm } from '../../shared/llms'
import { Movie, movieSchema } from './models'
import { HumanMessage } from '@langchain/core/messages'

const structuredLlm = qwen25InstructLlm.withStructuredOutput(movieSchema)

export async function testStructuredOutput() {
  const userQuery = '请为我推荐一部电影'

  try {
    const response: Movie = await structuredLlm.invoke([new HumanMessage(userQuery)])

    console.log('Structured Output Response: \n', JSON.stringify(response, null, 2))
  } catch (error) {
    console.error('Error executing structured output:', error)
  }
}
