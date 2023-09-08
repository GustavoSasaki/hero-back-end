import OpenAI from 'openai';
const apiKey = process.env.OPENAI_KEY!
export const openai = new OpenAI({ apiKey });

export async function generateImage(description: string) {
    
    const image = await openai.images.generate({ prompt : description, size: '256x256' });

    const url = image.data[0].url
    if (typeof url === 'string')
        return { url }

    throw new Error('error generating image')
}