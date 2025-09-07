import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    const existingUser = await prisma.user.findUnique({
      where: { username: userData.username },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        name: userData.name,
        template: userData.template || "template1",
        overview: userData.overview
          ? {
              create: userData.overview,
            }
          : undefined,
      },
      include: {
        overview: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
