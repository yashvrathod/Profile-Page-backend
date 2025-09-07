import { prisma } from "@/lib/prisma";

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
      include: {
        profile: true,
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
        customSection: {
          include: { items: true },
        },
        aboutSection: {
          include: { skills: true, cards: true, achievements: true, contacts: true },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
