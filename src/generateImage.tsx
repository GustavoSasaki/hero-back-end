import { Hero } from '@/pages/api/createHero';
import OpenAI from 'openai';
const apiKey = process.env.OPENAI_KEY!
const openai = new OpenAI({ apiKey });

export async function generateImage(hero: Hero) {
    const prompt = `an ${hero.gender} strong and young super hero named as ${hero.name} with the super power ${hero.power} and the alter ego as ${hero.alter_ego}`
    const image = await openai.images.generate({ prompt, size: '256x256' });

    const url = image.data[0].url
    if (typeof url === 'string')
        return { url }

    throw new Error('error generating image')
}

