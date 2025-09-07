import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { username: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: params.username },
      include: {
        overview: true,
        interests: true,
        technicalSkills: true,
        teaching: true,
        certifications: true,
        invitedTalks: true,
        research: true,
        journals: true,
        conferences: true,
        books: true,
        patents: true,
        industryInteraction: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
