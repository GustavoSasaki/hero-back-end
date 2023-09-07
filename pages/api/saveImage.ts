import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils"
import { z } from 'zod'
import { saveDescription, saveImage } from "@/src/saveImage";

const payloadSchema = z.object({
    token: z.string(),
    url: z.string(),
    id: z.number(),
    description: z.string()
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ result: string } >,
) {
    try {
        const json = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
        const body = payloadSchema.parse(json)

        if (body.token !== process.env.REVALIDATE_TOKEN) {
            return res.status(401).json({ result: 'wrong token' })
        }

        await saveImage(body.id, body.url)
        await saveDescription(body.id, body.description)

        return res.json({ result: 'success' })
    } catch (err) {
        return res.status(500).json({ result: 'fail' })
    }
}
