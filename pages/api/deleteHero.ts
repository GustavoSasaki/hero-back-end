import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils"
import { z } from 'zod'
import { supabase } from "@/src/supabase";

const payloadSchema = z.object({
    id: z.number()
})
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ result: string }>,
) {
    try {
        const json = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
        const body = payloadSchema.parse(json)

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