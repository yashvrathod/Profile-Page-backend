import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FiUser, FiEdit, FiGlobe } from "react-icons/fi"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Create Your
              <span className="text-primary block">Professional Profile</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Build a stunning academic and professional profile page that showcases your research, publications,
              achievements, and expertise. Choose from beautiful templates and get your own personalized URL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="text-lg px-8 py-6">
                  <FiUser className="w-5 h-5 mr-2" />
                  Create Your Profile
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  <FiEdit className="w-5 h-5 mr-2" />
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-foreground">Everything You Need</h2>
          <p className="text-muted-foreground text-lg">Comprehensive sections to showcase your professional journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                <FiUser className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Professional Overview</CardTitle>
              <CardDescription>Showcase your bio, contact information, and professional summary</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                <FiEdit className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Research & Publications</CardTitle>
              <CardDescription>
                Display your research projects, journal publications, and conference presentations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                <FiGlobe className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Custom URL</CardTitle>
              <CardDescription>Get your personalized profile URL at yoursite.com/username</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Profile Sections Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">12 Comprehensive Sections</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Overview",
              "Interests",
              "Technical Skills",
              "Teaching",
              "Certifications",
              "Invited Talks",
              "Research",
              "Journals",
              "Conferences",
              "Books",
              "Patents",
              "Industry Interaction",
            ].map((section) => (
              <div key={section} className="bg-card border rounded-lg p-4 text-center">
                <p className="font-medium text-foreground">{section}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Create your professional profile in minutes and share it with the world
          </p>
          <Link href="/create">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Building Your Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
