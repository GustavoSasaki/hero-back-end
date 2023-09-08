import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils"
import { z } from 'zod'
import { generateText } from "@/src/generateText";
import { saveBackstory } from "@/src/saveBackstory";


const payloadSchema = z.object({
    token: z.string(),
    id: z.number(),
    description: z.string()
})
export type generateBackstoryInput = z.infer<typeof payloadSchema>;

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

        const backstory = await generateText(body.description)
        if(!backstory)
            throw new Error('no output ia returned')

        await saveBackstory(body.id,backstory)
        

        return res.json({ result: 'success' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ result : 'fail'})
    }
}
