"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import Link from "next/link";

function CongratsPage() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/chat")
        }, 4000)
    }, [])

    return (
        <div className="w-full h-full flex items-center justify-center py-32">
            <div className=" mx-auto p-8 border-2 rounded-xl text-center">
                <h1 className="text-2xl mb-2">🎉 Thank You! 🎉</h1>
                <p className="mb-4">Your feedback means a lot to us! We're looking up to hear from you again.</p>
                <span className="text-xs">If you are not redirected, <Link href="/chat" className="text-purple-700"> click here</Link></span>
            </div>
        </div>
    )
}

export default CongratsPage
