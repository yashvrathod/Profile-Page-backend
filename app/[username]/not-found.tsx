import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FiUser, FiHome } from "react-icons/fi"

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
            <FiUser className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Profile Not Found</CardTitle>
          <CardDescription>The profile you're looking for doesn't exist or may have been removed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <FiHome className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/create">
              <Button className="flex items-center gap-2">
                <FiUser className="w-4 h-4" />
                Create Profile
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Want to create your own profile?{" "}
            <Link href="/create" className="text-primary hover:underline">
              Get started here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
