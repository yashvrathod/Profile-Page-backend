import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma" // Make sure prisma client is exported from lib/prisma.ts

export async function PATCH(req: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params

  try {
    const body = await req.json()
    const { template } = body

    if (!["minimalist", "academic", "vibrant"].includes(template)) {
      return NextResponse.json({ error: "Invalid template value" }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { username },
      data: { template },
    })

    return NextResponse.json({ success: true, template: updatedUser.template })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 })
  }
}
