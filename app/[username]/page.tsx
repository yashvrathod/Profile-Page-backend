import { notFound } from "next/navigation"
import { TemplateMinimalist } from "@/components/templates/template-minimalist"
import TemplateAcademic from "@/components/templates/template-academic"
import { TemplateVibrant } from "@/components/templates/template-vibrant"
import { getUserByUsername } from "@/lib/user-service"

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params

  // Fetch user data based on username
  const userData = await getUserByUsername(username)

  if (!userData) {
    notFound()
  }
  console.log(userData);

  // Prepare profile data for templates
 // Prepare profile data for templates
const profileData = {
 name: userData.name || "User",
    title: userData.profile?.name || "Professional",
    bio: userData.profile?.bio || "Welcome to my profile",
    profileImage: userData.profile?.profileImage || null,
    buttons: {
      primary: {
        label: userData.profile?.primaryButtonLabel,
        link: userData.profile?.primaryButtonLink,
      },
      secondary: {
        label: userData.profile?.secondaryButtonLabel,
        link: userData.profile?.secondaryButtonLink,
      },
    },
  profile: userData.profile || null,
  aboutSection: userData.aboutSection || null,
  sections: {
    ...Object.fromEntries(
      Object.entries({
        overview: userData.overview ? [userData.overview] : [],
        interests: userData.interests || [],
        technicalSkills: userData.technicalSkills || [],
        teaching: userData.teaching || [],
        certifications: userData.certifications || [],
        invitedTalks: userData.invitedTalks || [],
        research: userData.research || [],
        journals: userData.journals || [],
        conferences: userData.conferences || [],
        books: userData.books || [],
        patents: userData.patents || [],
        industryInteraction: userData.industryInteraction || [],
      }).filter(([_, value]) => Array.isArray(value) ? value.length > 0 : !!value)
    ),
    customSections: userData.customSection || [] // ✅ Include custom sections here
  }
}
// console.log("Custom Sections:", JSON.stringify(userData.customSection, null, 2))

  // Render the appropriate template
  switch (userData.template) {
    case "academic":
      return <TemplateAcademic data = {profileData}/>
    case "vibrant":
      return <TemplateVibrant data={profileData} />
    case "minimalist":
    default:
      return <TemplateMinimalist data={profileData} />
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = params
  const userData = await getUserByUsername(username)

  // console.log("Generating metadata for user:", userData);

  if (!userData) {
    return {
      title: "Profile Not Found",
    }
  }

  return {
    title: `${userData.name} - ${userData.overview?.title || "Professional Profile"}`,
    description: userData.overview?.bio || `Professional profile of ${userData.name}`,
    openGraph: {
      title: `${userData.name} - Professional Profile`,
      description: userData.overview?.bio || `Professional profile of ${userData.name}`,
      type: "profile",
    },
  }
}
