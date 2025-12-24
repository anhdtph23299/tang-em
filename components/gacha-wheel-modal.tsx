"use client"

import { useState, useRef, useEffect } from "react"
import confetti from "canvas-confetti"

const rewards = [
    { id: 1, title: "Siêu cấp Trà Sữa", wheelColor: "#ef4444", emoji: "🧋", description: "Size lớn nhất, Full topping!" },
    {
        id: 2,
        title: "Bữa ăn tối Unlimited",
        wheelColor: "#22c55e",
        emoji: "🍽️",
        description: "Em chọn quán, anh trả tiền!",
    },
    {
        id: 3,
        title: 'Voucher "Người yêu lý tưởng"',
        wheelColor: "#ef4444",
        emoji: "💆",
        description: "Massage + sấy tóc tận nơi.",
    },
    {
        id: 4,
        title: 'Thử thách "Người yêu ngoan"',
        wheelColor: "#22c55e",
        emoji: "💋",
        description: "Hôn anh 10 cái vào má.",
    },
    {
        id: 5,
        title: "Nấu cơm cho anh 1 tuần",
        wheelColor: "#eab308",
        emoji: "🍳",
        description: "Cơm vợ nấu là nhất!",
        isUnlucky: true,
    },
    {
        id: 6,
        title: 'Thẻ "Anh luôn đúng"',
        wheelColor: "#22c55e",
        emoji: "🤐",
        description: "10 phút quyền lực cho anh.",
    },
    {
        id: 7,
        title: "Quà Giáng Sinh Bí Mật",
        wheelColor: "#ef4444",
        emoji: "🎁",
        description: "Một bất ngờ đang chờ em.",
    },
    {
        id: 8,
        title: 'Thẻ "Miễn Tử Kim Bài"',
        wheelColor: "#facc15",
        emoji: "👑",
        description: "Xóa 1 lỗi cho anh (Vĩnh viễn)",
        isJackpot: true,
    },
]

interface GachaWheelModalProps {
    onClose: () => void
    onJackpotClaimed: (index: number) => void
}

export default function GachaWheelModal({ onClose, onJackpotClaimed }: GachaWheelModalProps) {
    const [isSpinning, setIsSpinning] = useState(false)
    const [selectedReward, setSelectedReward] = useState<any>(null)
    const [showResultModal, setShowResultModal] = useState(false)
    const [rotation, setRotation] = useState(0)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = 280

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate((rotation * Math.PI) / 180)

        rewards.forEach((reward, index) => {
            const startAngle = ((index * 45 - 90 - 22.5) * Math.PI) / 180
            const endAngle = (((index + 1) * 45 - 90 - 22.5) * Math.PI) / 180

            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.arc(0, 0, radius, startAngle, endAngle)
            ctx.fillStyle = reward.wheelColor
            ctx.fill()
            ctx.strokeStyle = "rgba(255,255,255,0.4)"
            ctx.lineWidth = 2
            ctx.stroke()

            ctx.save()
            const textAngle = startAngle + (endAngle - startAngle) / 2
            ctx.rotate(textAngle)
            ctx.translate(radius * 0.65, 0)
            ctx.rotate(Math.PI / 2)

            ctx.font = "40px Arial"
            ctx.textAlign = "center"
            ctx.fillStyle = "white"
            ctx.fillText(reward.emoji, 0, -25)

            ctx.font = "bold 14px Arial"
            const title = reward.title
            if (title.length > 12) {
                ctx.fillText(title.substring(0, 12), 0, 10)
                ctx.fillText(title.substring(12), 0, 27)
            } else {
                ctx.fillText(title, 0, 15)
            }
            ctx.restore()
        })

        ctx.restore()

        // Vẽ viền và trang trí
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2)
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 8
        ctx.stroke()

        for (let i = 0; i < 24; i++) {
            const dotAngle = (i * 15 * Math.PI) / 180
            const dotX = centerX + (radius + 15) * Math.cos(dotAngle)
            const dotY = centerY + (radius + 15) * Math.sin(dotAngle)
            ctx.beginPath()
            ctx.arc(dotX, dotY, 4, 0, Math.PI * 2)
            ctx.fillStyle = i % 2 === 0 ? "#facc15" : "#ffffff"
            ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(centerX, centerY, 55, 0, Math.PI * 2)
        ctx.fillStyle = "#ec4899"
        ctx.fill()
        ctx.strokeStyle = "white"
        ctx.lineWidth = 4
        ctx.stroke()
        ctx.font = "bold 20px Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("QUAY", centerX, centerY)
    }, [rotation])

    const spinWheel = () => {
        if (isSpinning) return
        setIsSpinning(true)
        setShowResultModal(false)

        let targetIndex = 7
        const rand = Math.random()
        if (rand > 0.85) targetIndex = Math.floor(Math.random() * 7)

        const startRotation = rotation
        const totalSpins = 10
        const degreesPerSegment = 360 / rewards.length
        const targetAngle = 360 - (targetIndex * degreesPerSegment)
        const finalRotation = startRotation + (360 * totalSpins) + (targetAngle - (startRotation % 360))

        const duration = 5000
        const startTime = performance.now()

        const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 4)
            const currentPos = startRotation + (finalRotation - startRotation) * easeOut
            setRotation(currentPos)

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                setIsSpinning(false)
                setSelectedReward(rewards[targetIndex])
                setShowResultModal(true)
                if (rewards[targetIndex].isJackpot) {
                    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
                }
            }
        }
        requestAnimationFrame(animate)
    }

    const handleAction = () => {
        if (selectedReward?.isJackpot) {
            const idx = rewards.findIndex(r => r.id === selectedReward.id)
            onJackpotClaimed(idx)
            setTimeout(onClose, 300)
        } else {
            setShowResultModal(false)
            setSelectedReward(null)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[200] p-4">
            {/* Container chính thêm relative để làm gốc cho Result Modal */}
            <div className="bg-gradient-to-b from-pink-50 to-rose-50 rounded-[2.5rem] p-6 md:p-10 max-w-2xl w-full aspect-square md:aspect-auto flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">

                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-8 text-gray-400 hover:text-rose-500 text-3xl transition-colors z-[70]"
                >
                    ✕
                </button>

                <h2 className="text-2xl md:text-3xl font-black text-rose-600 mb-8 font-mono tracking-tighter uppercase">
                    🌲 Vòng Quay Định Mệnh
                </h2>

                {/* Vòng quay */}
                <div className="relative flex justify-center items-center w-full">
                    <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 z-50 pointer-events-none drop-shadow-lg">
                        <svg width="40" height="50" viewBox="0 0 40 50">
                            <path d="M20 50 L0 0 L40 0 Z" fill="#e11d48" stroke="white" strokeWidth="2" />
                            <circle cx="20" cy="10" r="5" fill="white" />
                        </svg>
                    </div>

                    <canvas
                        ref={canvasRef}
                        width={700}
                        height={700}
                        onClick={spinWheel}
                        className={`max-w-[90%] md:max-w-full h-auto cursor-pointer rounded-full transition-transform ${isSpinning ? "" : "hover:scale-[1.02] active:scale-95"}`}
                    />
                </div>

                {/* HIỂN THỊ KẾT QUẢ - Đè lên toàn bộ vòng quay */}
                {showResultModal && selectedReward && (
                    <div className="absolute inset-0 z-[100] bg-white/95 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
                        <div className="text-center w-full max-w-md">
                            <div className="text-8xl mb-6 animate-bounce">{selectedReward.emoji}</div>

                            {selectedReward.isJackpot ? (
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-rose-600 uppercase tracking-tighter">🎉 CHIA BUỒN CÙNG EM 🎉</h3>
                                    <div className="bg-rose-50 rounded-2xl p-6 border-2 border-rose-100 shadow-inner">
                                        <p className="text-gray-800 font-black text-xl mb-2">{selectedReward.title}</p>
                                        <p className="text-gray-600 italic text-sm mb-4">"{selectedReward.description}"</p>
                                        <p className="text-rose-700 text-sm font-bold leading-relaxed">
                                            Định mệnh đã an bài! Bé không thể thoát khỏi kiếp nạn này rồi.
                                            Anh xin nhận quà trong sự "tiếc nuối" vô hạn! ❤️
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black text-gray-800 uppercase">{selectedReward.title}</h3>
                                    <p className="text-gray-600 italic text-lg">"{selectedReward.description}"</p>
                                </div>
                            )}

                            <button
                                onClick={handleAction}
                                className="mt-8 w-full py-5 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-widest text-lg"
                            >
                                {selectedReward.isJackpot ? "Chấp nhận định mệnh ❤️" : "Thử lại vận may!"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}