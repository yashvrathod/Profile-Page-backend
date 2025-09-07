function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side
    return window.location.origin;
  }

  // Server-side
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Fallback for local development
  return "http://localhost:3000";
}

// ✅ CLIENT-SAFE fetch-based utilities (no Prisma imports here)

export async function createUser(userData: {
  name: string;
  username: string;
  email?: string;
  template: string;
  title?: string;
  bio?: string;
}) {
  try {
    const response = await fetch(`${getBaseUrl()}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function checkUsernameAvailability(username: string) {
  try {
    const response = await fetch(
      `${getBaseUrl()}/api/users/${username.toLowerCase()}`
    );

    if (response.ok) return false; // user exists
    if (response.status === 404) return true; // username is available

    return false;
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
  }
}

export async function createSectionEntry(
  username: string,
  section: string,
  data: any
) {
  try {
    const response = await fetch(
      `${getBaseUrl()}/api/users/${username.toLowerCase()}/sections/${section}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to create ${section} entry`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error creating ${section} entry:`, error);
    throw error;
  }
}

export async function updateSectionEntry(
  username: string,
  section: string,
  data: any
) {
  try {
    const response = await fetch(
      `${getBaseUrl()}/api/users/${username.toLowerCase()}/sections/${section}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to update ${section} entry`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating ${section} entry:`, error);
    throw error;
  }
}

export async function deleteSectionEntry(
  username: string,
  section: string,
  id: string
) {
  try {
    const response = await fetch(
      `${getBaseUrl()}/api/users/${username.toLowerCase()}/sections/${section}?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to delete ${section} entry`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting ${section} entry:`, error);
    throw error;
  }
}
