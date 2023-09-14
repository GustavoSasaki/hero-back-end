import { CreateChatCompletionRequestMessage } from "openai/resources/chat";
import { openai } from "./generateImage";

const systemRole: CreateChatCompletionRequestMessage = { role: 'system', content: 'You are a famous novelist specialized in super hero stories' }
const model = 'gpt-3.5-turbo'

export async function generateText(description: string) {
    const userRole = getUserRole(description)

    const params = {
        messages: [userRole,systemRole],
        model
    };

    const completion = await openai.chat.completions.create(params);
    return completion.choices[0].message.content
}

function getUserRole(description: string): CreateChatCompletionRequestMessage{
    let content = 'create a small back story with less than 100 words to'
    content+=description
    content+='. The super hero lives in MagisVille.'

    return { role: 'user', content}
}