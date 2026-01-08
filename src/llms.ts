import {BaseChatModel} from "@langchain/core/language_models/chat_models";
import {settings} from "./config";
import {ChatOpenAI} from "@langchain/openai";

export const qwen25InstructLlm: BaseChatModel = (() => {
    console.debug(`Initializing Model: ${settings.qwen25Instruct}`);
    return new ChatOpenAI({
        model: settings.qwen25Instruct,
        temperature: 0.7,
        configuration: {
            baseURL: settings.baseUrl,
            apiKey: settings.siliconFlowApiKey
        }
    });
})()
