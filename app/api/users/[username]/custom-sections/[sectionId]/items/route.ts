import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { username: string; sectionId: string } }
) {
  const { username, sectionId } = params
  const { title, description, category } = await req.json()

  if (!title) return new Response("Missing title", { status: 400 })

  // ✅ Check user
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return new Response("User not found", { status: 404 })

  // ✅ Look up section by key (slug) instead of id
  const section = await prisma.customSection.findUnique({
    where: { key: sectionId },
  })
  if (!section || section.userId !== user.id) {
    return new Response("Section not found", { status: 404 })
  }

  // ✅ Create item
  const item = await prisma.customSectionItem.create({
    data: {
      sectionId: section.id,
      title,
      description,
      category,
    },
  })

  return new Response(JSON.stringify(item), { status: 201 })
}
