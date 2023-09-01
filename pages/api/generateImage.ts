import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils"
import { z } from 'zod'
import { generateImage } from "@/src/generateImage";

const payloadSchema = z.object({
    token: z.string(),
    name: z.string(),
    alter_ego: z.string(),
    power: z.string(),
    gender: z.string(),
    id: z.number()
})


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ result: string }>,
) {
    try {
        const json = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
        const body = payloadSchema.parse(json)

        if (body.token !== process.env.REVALIDATE_TOKEN) {
            return res.status(401).json({ result: 'wrong token' })
        }

        const { url } = await generateImage(body)
        const saveImage = JSON.stringify({ token: body.token, id: body.id, url })

        void fetch(`${process.env.BACK_END_URL}/api/saveImage`,
            { body: saveImage, method: "POST" }
        )
        await new Promise(resolve => setTimeout(resolve, 1000));

        return res.json({ result: 'success' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ result: `${process.env.BACK_END_URL}/api/saveImage` })
    }
}
