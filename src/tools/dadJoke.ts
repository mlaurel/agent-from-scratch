import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'

export const dadJokeToolDefinition = {
    name: 'dad_joke',
    parameters: z.object({}),
    description: 'Get a dad joke',
}

type Args = z.infer<typeof dadJokeToolDefinition.parameters>

export const dadJoke: ToolFn<Args> = async () => {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'agent-from-scratch (https://github.com/mlaurel/agent-from-scratch)'
        }
    })
    
    return (await response.json()).joke    

}
