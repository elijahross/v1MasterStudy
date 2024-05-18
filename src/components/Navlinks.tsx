"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/actions/auth"
import Link from "next/link"
import Image from "next/image"
import lout from "../../public/logout.svg"
import newchat from "../../public/newchat.svg"

const navLink = [
    {
        name: "Settings",
        link: "/chat/settings",
        image: "/settings3.svg"
    },
    {
        name: "Feedback",
        link: "/chat/feedback",
        image: "/feedback.svg"
    },
];

function Navlinks() {
    const router = useRouter();
    const[error, setError] = useState({} as Error | null);
    return (
        <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-start items-center flex-row my-4 transition-all duration-700 hover:scale-110 active:scale-100">
                <Image
                    src={newchat}
                    alt="chat_icon"
                    width={20}
                    height={20}
                    className="mr-4 dark:invert" />
                <button onClick={() => {router.refresh(); router.push("/chat"); }}>
                    Chat
                </button>
            </div>
            {navLink.map((item, index) => {return(
            <div key={index} className="flex w-full flex-start items-center flex-row my-4 transition-all duration-700 hover:scale-110 active:scale-90">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="mr-4 dark:invert" />
                <Link key={20+index} href={item.link} className={`w-full`}>
                    {item.name}
                </Link>
            </div>
            )})}
            <div className="flex w-full flex-start items-center flex-row my-4 transition-all duration-700 hover:scale-110 active:scale-90">
                <Image
                    src={lout}
                    alt="logout_icon"
                    width={20}
                    height={20}
                    className="mr-4 dark:invert" />
                <button onClick={async () => await logout().then(() => router.push("/"))}>
                    Log out
                </button>
            </div>
        </div>
    )
}

export default Navlinks
