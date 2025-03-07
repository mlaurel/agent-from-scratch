import openai from 'openai'
import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'

export const generateImageToolDefinition = {
    name: 'generate_image',
    parameters: z.object({
        prompt: z.string().describe('The prompt to use to generate the image')
    }),
    description: 'generate an image'
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args> = async ({
    toolArgs,
    userMessage
}) => {
    const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: toolArgs.prompt,
        n: 1,
        size: '1024x1024',
      })
    
      const imageUrl = response.data[0].url!
    
      return imageUrl
}