'use server'
import { writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return NextResponse.json({success: false})
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const date = yyyy + '-' + mm + '-' + dd;
    const path = `/Database/${date + file.name}`
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return NextResponse.json({ success: true})
}