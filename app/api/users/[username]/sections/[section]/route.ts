import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const sectionModels = {
  overview: "overview",
  interests: "interest",
  technicalSkills: "technicalSkill",
  teaching: "teaching",
  certifications: "certification",
  invitedTalks: "invitedTalk",
  research: "research",
  journals: "journal",
  conferences: "conference",  
  books: "book",
  patents: "patent",
  industryInteraction: "industryInteraction",
} as const



export async function POST(request: NextRequest, { params }: { params: { username: string; section: string } }) {
  try {
    const body = await request.json()
    const { username, section } = params

    // Get user ID
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    

    const sectionModel = sectionModels[section as keyof typeof sectionModels]
    if (!sectionModel) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 })
    }

    // Handle overview separately (update instead of create)
    if (section === "overview") {
      const overview = await prisma.overview.upsert({
        where: { userId: user.id },
        update: body,
        create: { ...body, userId: user.id },
      })
      // Fetch the latest overview
      const latestOverview = await prisma.overview.findUnique({
        where: { userId: user.id },
      })
      return NextResponse.json(latestOverview)
    }

    // Create new entry for other sections
    const entry = await (prisma as any)[sectionModel].create({
      data: { ...body, userId: user.id },
    })

    // Fetch the latest entry
    const latestEntry = await (prisma as any)[sectionModel].findUnique({
      where: { id: entry.id },
    })

    return NextResponse.json(latestEntry)
  } catch (error) {
    console.error(`Error creating ${params.section}:`, error)
    return NextResponse.json({ error: `Failed to create ${params.section}` }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { username: string; section: string } }) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const { section } = params

    const sectionModel = sectionModels[section as keyof typeof sectionModels]
    if (!sectionModel) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 })
    }

    const entry = await (prisma as any)[sectionModel].update({
      where: { id },
      data: updateData,
    })

    // Fetch the updated entry
    const updatedEntry = await (prisma as any)[sectionModel].findUnique({
      where: { id },
    })

    return NextResponse.json(updatedEntry)
  } catch (error) {
    console.error(`Error updating ${params.section}:`, error)
    return NextResponse.json({ error: `Failed to update ${params.section}` }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { username: string; section: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const { section } = params

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    const sectionModel = sectionModels[section as keyof typeof sectionModels]
    if (!sectionModel) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 })
    }

    await (prisma as any)[sectionModel].delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting ${params.section}:`, error)
    return NextResponse.json({ error: `Failed to delete ${params.section}` }, { status: 500 })
  }
}
