import React from 'react'
import Image from 'next/image'

function Hero() {
    return (
        <div className="relative w-full hidden lg:cx md:block     h-[40vh]">
            <Image
                src="/Hero-black.png"
                alt="Hero background"
                fill
                className="object-cover rounded-2xl"
                priority
            />
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl">
                <div className="absolute top-10 left-10 text-gray-300">
                    <h1 className="text-3xl font-bold text-gray-300 leading-relaxed">Asslamua Alikum, <br /> Name! 🌙</h1>
                    <div className="flex items-center gap-4 mt-6">
                        <div className="border-r border-gray-500  pr-4">
                            <h3 className="text-sm text-gray-400">Next Salah On</h3>
                            <p className="text-lg font-sm text-gray-300">Salah - Time PM</p>
                        </div>

                        <div className="border-r border-gray-500  pr-4">
                            <h3 className="text-sm text-gray-400">Next Azkar</h3>
                            <p className="text-lg font-sm text-gray-300">Azkar - Name </p>
                        </div>
                        <div className="">
                            <h3 className="text-sm text-gray-400">Last Login</h3>
                            <p className="text-lg font-sm text-gray-300">Last Login - Time PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero