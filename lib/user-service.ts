import { prisma } from "./prisma"

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side
    return window.location.origin
  }

  // Server-side
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // Fallback for local development
  return "http://localhost:3000"
}

// export async function getUserByUsername(username: string) {
//   try {
//     const response = await fetch(`${getBaseUrl()}/api/users/${username.toLowerCase()}`, {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       if (response.status === 404) return null;
//       throw new Error(`Failed to fetch user: ${response.statusText}`);
//     }

//     const user = await response.json();
//     return user;
//   } catch (error) {
//     console.error("Error fetching user with custom sections:", error);
//     return null;
//   }
// }

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
      include: {
        profile:true,
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
          include: {
            items: true, // fetch the items inside each custom section
          },
        },
        aboutSection: { include: { skills: true, cards: true, achievements: true, contacts: true }}
      },
    })

    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}




export async function createUser(userData: {
  name: string
  username: string
  email?: string
  template: string
  title?: string
  bio?: string
}) {
  try {
    const response = await fetch(`${getBaseUrl()}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        username: userData.username.toLowerCase(),
        email: userData.email,
        template: userData.template,
        overview:
          userData.title || userData.bio
            ? {
                title: userData.title,
                bio: userData.bio,
                description: userData.bio,
              }
            : undefined,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to create user")
    }

    const user = await response.json()
    return user
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function checkUsernameAvailability(username: string) {
  try {
    const response = await fetch(`${getBaseUrl()}/api/users/${username.toLowerCase()}`)

    // If user exists, username is not available
    if (response.ok) {
      return false
    }

    // If 404, username is available
    if (response.status === 404) {
      return true
    }

    // For other errors, assume not available for safety
    return false
  } catch (error) {
    console.error("Error checking username availability:", error)
    return false
  }
}

export async function createSectionEntry(username: string, section: string, data: any) {
  try {
    const response = await fetch(`${getBaseUrl()}/api/users/${username.toLowerCase()}/sections/${section}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Failed to create ${section} entry`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error creating ${section} entry:`, error)
    throw error
  }
}

export async function updateSectionEntry(username: string, section: string, data: any) {
  try {
    const response = await fetch(`${getBaseUrl()}/api/users/${username.toLowerCase()}/sections/${section}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Failed to update ${section} entry`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error updating ${section} entry:`, error)
    throw error
  }
}

export async function deleteSectionEntry(username: string, section: string, id: string) {
  try {
    const response = await fetch(`${getBaseUrl()}/api/users/${username.toLowerCase()}/sections/${section}?id=${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Failed to delete ${section} entry`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error deleting ${section} entry:`, error)
    throw error
  }
}
