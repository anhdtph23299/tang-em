"use client"

import { useEffect, useRef, useState } from "react"

const timelineEvents = [
  { year: "2023", title: "We Met", description: "Ngày đặc biệt khi gặp em" },
  { year: "2023", title: "First Date", description: "Buổi hẹn hò đầu tiên tuyệt vời" },
  { year: "2024", title: "First Kiss", description: "Nụ hôn đầu tiên ngọt ngào" },
  { year: "2024", title: "Forever Promise", description: "Hứa yêu em mãi mãi" },
]

export default function Timeline() {
  const [revealed, setRevealed] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(timelineEvents.map((_, i) => true))
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-rose-700 mb-4">Our Journey 💑</h2>
        <p className="text-gray-600 text-lg">Những dấu chân yêu thương của chúng ta</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`flex gap-6 mb-12 transition-all duration-700 delay-${
              index * 100
            } ${revealed[index] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            {/* Line and dot */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg" />
              {index < timelineEvents.length - 1 && (
                <div className="w-1 h-20 bg-gradient-to-b from-rose-300 to-pink-300 mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="pb-8 flex-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-pink-200 hover:shadow-xl transition-shadow duration-300">
                <p className="text-sm font-bold text-rose-600 mb-2">{event.year}</p>
                <h3 className="text-xl font-bold text-rose-700 mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
