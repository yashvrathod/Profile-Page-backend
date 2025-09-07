import { notFound } from "next/navigation"
import { getUserByUsername } from "@/lib/server/user-service"
import { ProfileEditor } from "@/components/profile-editor"

interface EditProfilePageProps {
  params: {
    username: string
  }
}

export default async function EditProfilePage({ params }: EditProfilePageProps) {
  const { username } = params

  // Fetch user data based on username
  const userData = await getUserByUsername(username)

  if (!userData) {
    notFound()
  }

  // TODO: Add authentication check here
  // For now, anyone can edit any profile
  // In production, you'd check if the current user owns this profile

  return (
    <div className="min-h-screen bg-background">
      <ProfileEditor userData={userData} />
    </div>
  )
}
