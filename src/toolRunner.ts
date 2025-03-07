import type OpenAI from 'openai'
import { generateImage, generateImageToolDefinition } from './tools/generateImage'
import { dadJoke, dadJokeToolDefinition } from './tools/dadJoke'
import { reddit, redditToolDefinition } from './tools/reddit'

const getWeather = () => `its hot like 96degs in the shade`

export const runTool = async (
    toolCall: OpenAI.Chat.Completions.CreateChatCompletionMessageToolCall,
    userMessage: string,
) => {
    const input = {
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
    }

    switch (toolCall.function.name) {
        case generateImageToolDefinition.name:
            return generateImage(input)
        case dadJokeToolDefinition.name:
            return dadJoke(input)
        case redditToolDefinition.name:
            return reddit(input)

        default:
            return `Never run this tool: ${toolCall.function.name} again, or else!`
    }

}
