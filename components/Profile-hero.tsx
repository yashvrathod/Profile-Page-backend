"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ProfileSectionProps {
  data: any
}

export const ProfileHero: React.FC<ProfileSectionProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`relative w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <section className="relative overflow-hidden py-16">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col items-center gap-12">
          {/* Profile Image */}
          <div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl shadow-pink-200/50">
            <Image
              src={data.profileImage || "/profile2.jpg"}
              alt={data.name}
              fill
              className="object-cover"
            />
            {/* Glowing ring */}
            <div className="absolute -inset-1 rounded-full border-4 border-pink-300 opacity-50 animate-ping"></div>
          </div>

          {/* Text Section */}
          <div className="text-center max-w-3xl space-y-6">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900">
              Hi, I'm{" "}
              <span className="text-pink-500 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500">
                {data.profile.name}
              </span>
            </h1>
            <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
              {data.profile?.headline ||
                "I craft visually stunning web experiences that combine modern design and cutting-edge technologies."}
            </p>
            <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
              {data.bio ||
                "My toolkit includes Next.js, Tailwind CSS, and TypeScript."}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {data.buttons?.primary?.label && (
                <a
                  href={data.buttons.primary.link || "#projects"}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {data.buttons.primary.label}
                </a>
              )}
              {data.buttons?.secondary?.label && (
                <a
                  href={data.buttons.secondary.link || "#contact"}
                  className="px-8 py-3 border-2 border-pink-400 text-pink-500 font-semibold rounded-full backdrop-blur-md bg-white/20 hover:bg-white/40 transition-all duration-300"
                >
                  {data.buttons.secondary.label}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Floating abstract shapes */}
        <div className="absolute top-10 left-10 w-36 h-36 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>
    </div>
  )
}
