import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: { username: string } }) {
  try {
    const { username } = params
    const body = await req.json()
    
    // Find the user
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) return new Response("User not found", { status: 404 })

    // Map contacts: add icon in code (not in Prisma model)
    const contacts = body.contacts.map((c: any) => ({
      ...c,
      icon: getIconForType(c.type) // assign icon in code
    }))

    const about = await prisma.aboutSection.upsert({
      where: { userId: user.id },
      update: {
        heading: body.heading,
        description: body.description,
        skills: {
          deleteMany: {},
          create: body.skills.map((s: any, idx: number) => ({
            label: s.label,
            order: idx
          }))
        },
        cards: {
          deleteMany: {},
          create: body.cards.map((c: any) => ({
            title: c.title,
            content: c.content,
            bgColor: c.bgColor || undefined,
            icon: getIconForCard(c) // optional, provide in code
          }))
        },
        achievements: {
          deleteMany: {},
          create: body.achievements.map((a: any) => ({
            count: a.count,
            label: a.label,
            color: a.color,
            bgColor: a.bgColor
          }))
        },
        contacts: {
          deleteMany: {},
          create: body.contacts // store without icon in DB
        }
      },
      create: {
        userId: user.id,
        heading: body.heading,
        description: body.description,
        skills: {
          create: body.skills.map((s: any, idx: number) => ({
            label: s.label,
            order: idx
          }))
        },
        cards: {
          create: body.cards.map((c: any) => ({
            title: c.title,
            content: c.content,
            bgColor: c.bgColor || undefined,
            icon: getIconForCard(c) // assign icon in code
          }))
        },
        achievements: {
          create: body.achievements.map((a: any) => ({
            count: a.count,
            label: a.label,
            color: a.color,
            bgColor: a.bgColor
          }))
        },
        contacts: {
          create: body.contacts // save as-is, no icon
        }
      }
    })

    return new Response(JSON.stringify(about), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response("Internal Server Error", { status: 500 })
  }
}

// Helper to provide icon dynamically in code
function getIconForType(type: string) {
  switch (type.toLowerCase()) {
    case "email": return "✉️"
    case "linkedin": return "🔗"
    case "call": return "📞"
    default: return "🔹"
  }
}

function getIconForCard(card: any) {
  return card.icon || "⭐" // default icon if none provided
}
