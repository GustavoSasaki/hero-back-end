import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils"
import { z } from 'zod'
import { supabase } from "@/src/supabase";
import { Database } from "@/src/database.types";


const payloadSchema = z.object({
    token: z.string(),
    name: z.string(),
    alter_ego: z.string(),
    power: z.string(),
    gender: z.string()
})
export type Hero = Omit<Database['public']['Tables']['heroes']['Row'], 'id'>


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ result: string } | { id: number }>,
) {
    try {
        const body = payloadSchema.parse(req.body)

        if (body.token !== process.env.REVALIDATE_TOKEN) {
            return res.status(401).json({ result: 'wrong token' })
        }
        const { token, ...hero } = body;

        const { id } = await putInDatabase(hero)

        const generateImageBody = JSON.stringify({ id, ...body })
        void fetch(`${process.env.BACK_END_URL}/api/generateImage`,
            { body: generateImageBody, method: "POST" }
        )
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return res.json({ id})
    } catch (err) {
        return res.status(500).json({ result: 'fail' })
    }
}

async function putInDatabase(heroInfo: Hero) {

    const { data } = await supabase.from('heroes').insert(heroInfo).select('id').single()

    if (typeof data?.id === 'number')
        return { id: data.id }

    throw new Error('error adding hero')
}