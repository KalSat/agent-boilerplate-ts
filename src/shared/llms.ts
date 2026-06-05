import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { settings } from './config'
import { ChatOpenAI } from '@langchain/openai'

export const baseLlm: BaseChatModel = (() => {
  console.debug(`Initializing Model: ${settings.model}`)
  return new ChatOpenAI({
    model: settings.model,
    temperature: 0.3,
    configuration: {
      baseURL: settings.baseUrl,
      apiKey: settings.apiKey,
    },
  })
})()

export const smallFastLlm: BaseChatModel = (() => {
  console.debug(`Initializing Small Fast Model: ${settings.smallFastModel}`)
  return new ChatOpenAI({
    model: settings.smallFastModel,
    temperature: 0.3,
    configuration: {
      baseURL: settings.baseUrl,
      apiKey: settings.apiKey,
    },
    modelKwargs: { enable_thinking: false },
  })
})()
