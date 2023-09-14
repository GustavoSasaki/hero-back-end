import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils"
import { z } from 'zod'
import { generateImage } from "@/src/generateImage";

const payloadSchema = z.object({
    token: z.string(),
    id: z.number(),
    description: z.string()
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

        const { url } = await generateImage(body.description)
        const saveImage = JSON.stringify({ url, ...body })

        void fetch(`${process.env.BACK_END_URL}/api/saveImage`,
            { body: saveImage, method: "POST" }
        )
        await new Promise(resolve => setTimeout(resolve, 1000));

        return res.json({ result: 'success' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ result: `fail` })
    }
}
