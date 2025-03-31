"use client"

import { signIn } from "next-auth/react"

export function LoginButton() {
    return (
        <div className="flex justify-center">
            <div className="relative p-[1px] rounded-lg border border-white/20">
                <button
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] transition-all font-serif text-sm sm:text-base md:text-lg p-2 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-lg cursor-pointer hover:scale-105 transform-gpu w-full max-w-[140px] text-center bg-black/10"
                    onClick={() => signIn()}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
