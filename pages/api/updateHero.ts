import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils"
import { z } from 'zod'
import { supabase } from "@/src/supabase";
import { Hero } from "./createHero";

const payloadSchema = z.object({
    token: z.string(),
    id: z.number(),
    name: z.string().optional(),
    alter_ego: z.string().optional(),
    power: z.string().optional(),
    gender: z.string().optional()
})
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ result: string }>,
) {
    try {
        const body = payloadSchema.parse(req.body)

        if (body.token !== process.env.REVALIDATE_TOKEN) {
            return res.status(401).json({ result: 'wrong token' })
        }
        const { token, id, ...hero } = body;

        await updateHeroInDatabase(hero, id)
        
        return res.json({ result: 'success' })
    } catch (err) {
        return res.status(500).json({ result: 'fail' })
    }
}

async function updateHeroInDatabase(newInfo: Partial<Hero>, id: number) {
    const { error } = await supabase.from('heroes').update(newInfo).eq('id', id)

    if (!!error)
        throw new Error('error in database')
}