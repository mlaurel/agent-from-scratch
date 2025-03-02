import { JSONFilePreset } from "lowdb/node";
import type { AIMessage, ToolFn } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { create } from "got";

export type MessageWithMetadata = AIMessage & {
    id: string
    createdAt: string
}

type Data = {
    messages: MessageWithMetadata[]
}

export const addMetadata = (message: AIMessage): MessageWithMetadata => ({
    ...message,
    id: uuidv4(),
    createdAt: new Date().toISOString()
})

export const removeMetadata = (message: MessageWithMetadata): AIMessage => {
    const { id, createdAt, ...messageWithoutMetadata } = message
    return messageWithoutMetadata
}

const detaultData: Data = { messages: [] }

export const getDb = async () => {
    const db = await JSONFilePreset<Data>('db.json', detaultData)
    return db
}

export const addMessages = async (messages: AIMessage[]) => {
    const db = await getDb()
    db.data.messages.push(...messages.map(addMetadata))
    await db.write()
}

export const getMessages = async () => {
    const db = await getDb()
    return db.data.messages.map(removeMetadata)
}
