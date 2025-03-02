import 'dotenv/config'
import { runAgent } from './src/agent'
import { z } from 'zod'
// import { runLLM } from './src/llm'
// import { addMessages, getMessages } from "./src/memory"

const userMessage = process.argv[2]

if (!userMessage) {
    console.error('Please provide a message')
    process.exit(1)
}

const weatherTool = {
    name: 'get_weather',
    parameters: z.object({})
}
const response = await runAgent({ userMessage, tools: [weatherTool] })

// await addMessages([{ role: 'user', content: userMessage }])
// const messages = await getMessages()
// const response = await runLLM({
//     messages: [...messages],
//     tools: []
// })
// await addMessages([{ role: 'assistant', content: response }])


console.log(response)
