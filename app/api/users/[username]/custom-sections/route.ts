// app/api/users/[username]/custom-sections/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params

  try {
    const sections = await prisma.customSection.findMany({
      where: { user: { username } },
      include: {
        items: true, // important to include items
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return NextResponse.json(sections)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to fetch custom sections" }, { status: 500 })
  }
}
