import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET profile by username
export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params

    const user = await prisma.user.findUnique({
      where: { username },
      select: { profile: true },
    })

    if (!user || !user.profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json(user.profile)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

// POST - create or update profile (upsert)
export async function POST(req: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params
    const body = await req.json()

    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: body,                 // update if profile exists
      create: { ...body, userId: user.id }, // create if missing
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error creating/updating profile:", error)
    return NextResponse.json({ error: "Failed to create/update profile" }, { status: 500 })
  }
}

// PUT - update profile (optional)
export async function PUT(req: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params
    const body = await req.json()

    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId: user.id },
      data: body,
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
