// ✅ Fix for APP Router (route.ts)
import { writeFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("BODY", body)


    const { username } = body

    // Clean username (remove spaces, lowercase)
    const safeUsername = username.trim().toLowerCase()

    if (!username) {
      return NextResponse.json({ success: false, error: 'No username provided' }, { status: 400 })
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head><title>${safeUsername}'s Portfolio</title></head>
      <body>
        <h1>Welcome to ${safeUsername}.binarytree.me</h1>
        <p>This is a published portfolio.</p>
      </body>
      </html>
    `

    const filePath = path.join(process.cwd(), 'public', 'sites', `${safeUsername}.html`)
    await writeFile(filePath, html)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error in publish API:', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}