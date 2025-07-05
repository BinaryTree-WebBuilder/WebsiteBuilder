// pages/api/publish.ts (Next.js API route for local dev)
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { username } = JSON.parse(req.body)

  // Optionally: Validate and persist something (e.g. mark "is_published" in DB)

  res.status(200).json({ success: true })
}
