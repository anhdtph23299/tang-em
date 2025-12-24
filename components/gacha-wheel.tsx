"use client"

import { useState, useEffect } from "react"
import GachaWheelModal from "./gacha-wheel-modal"

const confettiDots = Array.from({ length: 40 }, (_, i) => i)

export default function GiftBox() {
    const [opened, setOpened] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [showGachaModal, setShowGachaModal] = useState(false)
    const [hasClaimed, setHasClaimed] = useState(false)

    useEffect(() => {
        // Kiểm tra xem đã dính "Miễn tử kim bài" chưa
        const isClaimed = localStorage.getItem("reward_claimed") === "true"
        if (isClaimed) {
            setHasClaimed(true)
        }
    }, [])

    const handleOpenBox = () => {
        if (opened) return
        setOpened(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 4000)
    }

    const handleGachaClick = () => {
        if (hasClaimed) {
            alert("Định mệnh chỉ gõ cửa một lần thôi bé ơi! Ô này khóa rồi ❤️")
            return
        }
        setShowGachaModal(true)
    }

    const onSpinFinished = (rewardIndex: number) => {
        setHasClaimed(true)
        localStorage.setItem("reward_claimed", "true")
        localStorage.setItem("reward_index", String(rewardIndex))
        // Hiệu ứng sau khi quay xong có thể thêm ở đây
    }

    return (
        <section className="relative px-4 py-20 min-h-[700px] flex flex-col items-center justify-start overflow-hidden bg-transparent">
            <style>{`
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
                @keyframes fall { 
                  0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-fall { animation: fall 4s linear forwards; }
                .perspective { perspective: 1200px; }
            `}</style>

            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-[100]">
                    {confettiDots.map((i) => (
                        <div
                            key={i}
                            className="absolute text-2xl animate-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                color: i % 2 === 0 ? '#fb7185' : '#fbbf24'
                            }}
                        >
                            {i % 3 === 0 ? "✨" : i % 3 === 1 ? "❄️" : "❤️"}
                        </div>
                    ))}
                </div>
            )}

            <div className="max-w-xl w-full text-center z-10">
                <h2 className="text-4xl md:text-6xl font-black text-rose-600 mb-12 drop-shadow-md tracking-tighter">
                    SPECIAL GIFT 🎁
                </h2>

                <div className="relative h-80 flex items-center justify-center mb-10 perspective">
                    {!opened ? (
                        <div
                            onClick={handleOpenBox}
                            className="group relative cursor-pointer transform transition-all duration-500 hover:scale-110 active:scale-95"
                        >
                            <div className="absolute inset-[-30px] bg-rose-400/20 blur-3xl rounded-full animate-pulse" />
                            <div className="relative text-[10rem] md:text-[13rem] animate-float drop-shadow-2xl select-none">
                                🎁
                                <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-max text-xs font-black text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-[0.2em]">
                                    Chạm để nhận bất ngờ
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in zoom-in slide-in-from-bottom-10 duration-1000 w-full max-w-sm">
                            <div className="bg-white rounded-[2rem] p-1 shadow-[0_20px_50px_rgba(251,113,133,0.3)] border border-rose-100 overflow-hidden">
                                <div className="bg-gradient-to-b from-rose-50 to-white rounded-[1.8rem] p-6 relative">

                                    <div className="flex justify-center items-center gap-2 mb-6">
                                        <span className="text-rose-500 text-2xl animate-bounce">🎫</span>
                                        <h3 className="text-2xl font-black text-rose-700 tracking-tight uppercase">Vé Yêu Em</h3>
                                        <span className="text-rose-500 text-2xl animate-bounce">🎫</span>
                                    </div>

                                    <div className="border-4 border-dashed border-rose-200 rounded-2xl p-5 bg-white relative overflow-hidden">
                                        {/* Dấu Stamp */}
                                        <div className="absolute top-2 right-2 border-2 border-rose-600/20 text-rose-600/20 font-black px-2 py-1 rounded rotate-[15deg] text-[10px] uppercase pointer-events-none">
                                            Premium <br/> Member
                                        </div>

                                        <p className="text-4xl font-black text-rose-600 mb-6 tracking-widest italic opacity-80">LOVE-2025</p>

                                        <div className="text-left space-y-4 mb-8">
                                            <div className="flex items-start gap-3">
                                                <span className="text-rose-400 mt-1">✦</span>
                                                <p className="text-gray-700 text-sm font-semibold">Quyền lợi: <span className="text-rose-500">Trọn đời bên anh</span></p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-rose-400 mt-1">✦</span>
                                                <p className="text-gray-700 text-sm font-semibold">Bảo hành: <span className="text-rose-500">Vô điều kiện</span></p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-rose-400 mt-1">✦</span>
                                                <p className="text-gray-700 text-sm font-semibold">Thời hạn: <span className="text-rose-500">Vĩnh cửu</span></p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleGachaClick}
                                            disabled={hasClaimed}
                                            className={`w-full py-4 rounded-xl font-black text-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 uppercase tracking-tighter
                                            ${hasClaimed
                                                ? "bg-gray-300 shadow-none cursor-not-allowed"
                                                : "bg-gradient-to-r from-rose-500 to-orange-400 hover:scale-[1.02] animate-pulse"}`}
                                        >
                                            {hasClaimed ? "✓ Đã nhận Miễn Tử Bài" : "💎 Quay số nhận quà kèm"}
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setOpened(false)}
                                        className="mt-6 text-gray-400 hover:text-rose-400 text-[10px] font-black uppercase transition-colors tracking-widest"
                                    >
                                        — Đóng món quà —
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showGachaModal && (
                <GachaWheelModal
                    onClose={() => setShowGachaModal(false)}
                    onJackpotClaimed={onSpinFinished}
                />
            )}
        </section>
    )
}