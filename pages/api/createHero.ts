import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils"
import { z } from 'zod'
import { supabase } from "@/src/supabase";
import { Database } from "@/src/database.types";
import { createPrompt } from "@/src/createPrompt";


const payloadSchema = z.object({
    name: z.string(),
    alter_ego: z.string(),
    power: z.string(),
    gender: z.string(),
    color: z.string(),
    age: z.string().optional().transform(x => { return x === undefined ? null : x }),
})
export type Hero = Omit<Database['public']['Tables']['heroes']['Row'], 'id' | 'backstory'>


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ result: string } | { id: number }>,
) {
    try {
        const json = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
        const body = payloadSchema.parse(json)

        const description = createPrompt(body)
        const { id } = await putInDatabase({ description, ...body })

        const generateBody = JSON.stringify({ id, description, token: process.env.REVALIDATE_TOKEN })
        void callGenerateBackStory(generateBody)
        void callGenerateImage(generateBody)
        await new Promise(resolve => setTimeout(resolve, 1000));

        return res.json({ id })
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


async function callGenerateBackStory(body: string) {

    void fetch(`${process.env.BACK_END_URL}/api/generateBackstory`,
        { body, method: "POST" }
    )
}
async function callGenerateImage(body: string) {

    await fetch(`${process.env.BACK_END_URL}/api/generateImage`,
        { body, method: "POST" }
    )
}