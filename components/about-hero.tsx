"use client"

import { useEffect, useState } from "react"

interface AboutSectionProps {
  data: any
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Use data.aboutSection instead of data.about
  const about = data.aboutSection || {
    heading: "About Me",
    description: "",
    skills: [],
    cards: [],
    achievements: [],
    contacts: [],
  }

  return (
    <section
      className={`relative bg-gradient-to-b from-yellow-50 via-pink-50 to-yellow-100 py-24 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-20 flex flex-col items-center gap-12">
        {/* Heading */}
        <div className="text-center max-w-3xl space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">
            {about.heading}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {about.description}
          </p>
        </div>

        {/* Skills */}
        {about.skills?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {about.skills.map((skill: any, idx: number) => (
              <span
                key={idx}
                className="bg-white/60 backdrop-blur-md px-6 py-2 rounded-full text-gray-800 shadow-md hover:scale-105 transform transition duration-300"
              >
                {skill.label}
              </span>
            ))}
          </div>
        )}

        {/* Cards */}
        {about.cards?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {about.cards.map((card: any, idx: number) => (
              <div
                key={idx}
                className={`${card.bgColor || "bg-white"} rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300`}
              >
                <div className={`${card.iconColor || "text-purple-500"} text-3xl mb-4`}>
                  {card.icon || "⭐"}
                </div>
                <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievements */}
      {about.achievements?.length > 0 && (
        <section className="bg-gradient-to-b from-green-50 via-white to-green-50 py-20">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
              Achievements & Impact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {about.achievements.map((ach: any, idx: number) => (
                <div
                  key={idx}
                  className={`${ach.bgColor || "bg-gray-50"} border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition`}
                >
                  <h3 className={`text-3xl font-bold ${ach.color || "text-gray-800"}`}>
                    {ach.count}
                  </h3>
                  <p className="text-gray-700 mt-2">{ach.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contacts */}
      {about.contacts?.length > 0 && (
        <section className="bg-gradient-to-b from-green-50 via-white to-green-50 py-20">
          <div className="container mx-auto px-6 lg:px-20 text-center">
            <div className="flex flex-wrap justify-center gap-6">
              {about.contacts.map((c: any, idx: number) => (
                <a
                  key={idx}
                  href={c.link}
                  target={c.link?.startsWith("http") ? "_blank" : undefined}
                  rel={c.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-md transition ${c.style || "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                >
                  {c.icon || "🔗"} {c.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating abstract shapes */}
      <div className="absolute top-10 left-10 w-36 h-36 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </section>
  )
}
