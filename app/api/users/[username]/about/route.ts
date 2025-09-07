import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: { username: string } }) {
  try {
    const { username } = params
    const body = await req.json()

    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) return new Response("User not found", { status: 404 })

    // Safe defaults
    const skills = body.skills || []
    const cards = body.cards || []
    const achievements = body.achievements || []
    const contacts = body.contacts || []

    const about = await prisma.aboutSection.upsert({
      where: { userId: user.id }, // make sure userId is unique in schema
      update: {
        heading: body.heading || "",
        description: body.description || "",
        skills: {
          deleteMany: {},
          create: skills.map((s: any, idx: number) => ({
            label: s.label || "",
            order: idx
          }))
        },
        cards: {
          deleteMany: {},
          create: cards.map((c: any) => ({
            title: c.title || "",
            content: c.content || "",
            bgColor: c.bgColor || undefined,
            icon: getIconForCard(c)
          }))
        },
        achievements: {
          deleteMany: {},
          create: achievements.map((a: any) => ({
            count: a.count || 0,
            label: a.label || "",
            color: a.color || undefined,
            bgColor: a.bgColor || undefined
          }))
        },
        contacts: {
          deleteMany: {},
          create: contacts.map((c: any) => ({
            type: c.type || "",
            value: c.value || ""
          }))
        }
      },
      create: {
        userId: user.id,
        heading: body.heading || "",
        description: body.description || "",
        skills: {
          create: skills.map((s: any, idx: number) => ({
            label: s.label || "",
            order: idx
          }))
        },
        cards: {
          create: cards.map((c: any) => ({
            title: c.title || "",
            content: c.content || "",
            bgColor: c.bgColor || undefined,
            icon: getIconForCard(c)
          }))
        },
        achievements: {
          create: achievements.map((a: any) => ({
            count: a.count || 0,
            label: a.label || "",
            color: a.color || undefined,
            bgColor: a.bgColor || undefined
          }))
        },
        contacts: {
          create: contacts.map((c: any) => ({
            type: c.type || "",
            value: c.value || ""
          }))
        }
      }
    })

    return new Response(JSON.stringify(about), { status: 200 })
  } catch (err) {
    console.error("AboutSection POST error:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}

// Helpers
function getIconForType(type: string) {
  switch (type.toLowerCase()) {
    case "email": return "✉️"
    case "linkedin": return "🔗"
    case "call": return "📞"
    default: return "🔹"
  }
}

function getIconForCard(card: any) {
  return card.icon || "⭐"
}
