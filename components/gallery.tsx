"use client"

import { useState, useRef, useEffect } from "react"

const reasons = [
  { id: 1, title: "Năng lượng tích cực từ nụ cười của em", icon: "😊" },
  { id: 2, title: "Trái tim ấm áp luôn hướng về nhà", icon: "👨‍👩‍👧" },
  { id: 3, title: "Sự độc lập và mạnh mẽ của em", icon: "💪" },
  { id: 4, title: "Cách em khiến anh cảm thấy mình đặc biệt", icon: "💗" },
  { id: 5, title: "Cách em đối xử với bạn bè", icon: "👯" },
  { id: 6, title: "Ánh sáng từ những giấc mơ em đang theo đuổi", icon: "✨" },
]

export default function Gallery() {
  const [revealed, setRevealed] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"tab" | "carousel" | "grid">("tab")
  const [activeTab, setActiveTab] = useState(0)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newRevealed = reasons.map((_, i) => i)
            setRevealed(newRevealed)
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

  const ReasonCard = ({ reason }: { reason: (typeof reasons)[0] }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-pink-200 text-center">
      <div className="text-5xl mb-4">{reason.icon}</div>
      <p className="text-lg font-semibold text-rose-700">{reason.title}</p>
    </div>
  )

  return (
    <section ref={sectionRef} className="px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-rose-700 mb-4">Những Lí Do Yêu Em 💕</h2>
        <p className="text-gray-600 text-lg">Chọn cách xem bạn thích</p>
      </div>

      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        <button
          onClick={() => setViewMode("tab")}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            viewMode === "tab"
              ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
              : "bg-white text-rose-700 border-2 border-rose-300 hover:bg-pink-50"
          }`}
        >
          Từng cái một
        </button>
        <button
          onClick={() => setViewMode("carousel")}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            viewMode === "carousel"
              ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
              : "bg-white text-rose-700 border-2 border-rose-300 hover:bg-pink-50"
          }`}
        >
          Slide xem
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            viewMode === "grid"
              ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
              : "bg-white text-rose-700 border-2 border-rose-300 hover:bg-pink-50"
          }`}
        >
          Xem tất cả
        </button>
      </div>

      {/* Tab Mode - Một cái một lúc */}
      {viewMode === "tab" && (
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <ReasonCard reason={reasons[activeTab]} />
          </div>
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
              disabled={activeTab === 0}
              className="px-6 py-2 bg-rose-500 text-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-600 transition-colors"
            >
              ← Trước
            </button>
            <div className="flex gap-2">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTab ? "bg-rose-500 w-8" : "bg-pink-300 hover:bg-rose-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveTab(Math.min(reasons.length - 1, activeTab + 1))}
              disabled={activeTab === reasons.length - 1}
              className="px-6 py-2 bg-rose-500 text-white rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-600 transition-colors"
            >
              Tiếp →
            </button>
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            {activeTab + 1} / {reasons.length}
          </p>
        </div>
      )}

      {/* Carousel Mode */}
      {viewMode === "carousel" && (
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {reasons.map((reason) => (
                  <div key={reason.id} className="w-full flex-shrink-0 px-4">
                    <ReasonCard reason={reason} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
              disabled={carouselIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 md:translate-x-0 md:left-2 bg-rose-500 text-white p-3 rounded-full disabled:opacity-50 hover:bg-rose-600 transition-colors z-10"
            >
              ←
            </button>
            <button
              onClick={() => setCarouselIndex(Math.min(reasons.length - 1, carouselIndex + 1))}
              disabled={carouselIndex === reasons.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 md:translate-x-0 md:right-2 bg-rose-500 text-white p-3 rounded-full disabled:opacity-50 hover:bg-rose-600 transition-colors z-10"
            >
              →
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {reasons.map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === carouselIndex ? "bg-rose-500 w-8" : "bg-pink-300 w-2 hover:bg-rose-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grid Mode */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={reason.id} className="opacity-100 translate-y-0">
              <ReasonCard reason={reason} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
