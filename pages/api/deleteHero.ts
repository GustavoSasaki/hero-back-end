import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils"
import { z } from 'zod'
import { supabase } from "@/src/supabase";

const payloadSchema = z.object({
    token: z.string(),
    id: z.number()
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

        await removeFromDatabase(body.id)

        return res.json({ result: 'success' })
    } catch (err) {
        return res.status(500).json({ result: 'fail' })
    }
}

async function removeFromDatabase(id: number) {
    const { error } = await supabase.from('heroes').delete().eq('id', id)

    if (!!error)
        throw new Error('error in database')
}