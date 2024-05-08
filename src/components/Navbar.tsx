"use client"
import { useState, useEffect } from "react"
import { getSession } from "@/actions/session"
import {getConnectionsLeft} from "@/actions/connectionResstriction"
import Navlinks from "./Navlinks"
import Image from "next/image"
import menu from "../../public/menu.svg"

interface User {
    userId: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
}

function Navbar() {
    const [user, setUser] = useState({} as any);
    const [toggle, setToggle] = useState(false);
    const [restrictions, setRestrictions] = useState("?") as any;

    const handleClickOutside = (event: MouseEvent) => {
        const container = document.getElementById("cont");
        if (container && !container.contains(event.target as Node)) {
            setToggle(false);
        }
    }

    useEffect(() =>{
        document.addEventListener("mousedown", handleClickOutside);
        getSession().then((session) => setUser(session?.user)).catch((err) => console.log(err));
        getConnectionsLeft().then((res) => setRestrictions(res)).catch((err) => setRestrictions("."));

        return() => {document.removeEventListener("mousedown", handleClickOutside)};
    },[])

    return (
        <div className="relative max-w-[35%] w-fit md:py-10 py-0 z-90">
            <div className="flex flex-col items-center md:block hidden">
                <div className="mt-10 ml-2 mb-8 flex flex-col w-full items-center">
                    <div className="aspect-square rounded-full w-[100px] h-auto p-4 bg-green-400">
                        <p className="text-white font-bold text-[48px] text-center">
                            {user.userId ? user.name?.charAt(0) : "LR"}
                        </p>
                    </div>
                    <div className="my-4">
                        <p className="text-gray text-[14px] w-full">
                            Session:  {restrictions}/3
                        </p>
                    </div>
                </div>
                <Navlinks />
            </div>
            <div className="md:hidden fixed w-full flex flex-start pt-4">
                <Image
                    src={menu}
                    alt="menu_icon"
                    width={30}
                    onClick={() => setToggle(!toggle)}
                    className="h-auto cursor-pointer transition-all active:scale-90"
                />
            </div>
            <div id="cont" className={`md:hidden fixed w-fit px-4 h-full top-0 bg-white left-0 transition-all duration-1000 z-50 ${toggle ? "block" : "hide"}`}>
                <div className="flex flex-col items-center">
                    <div className="mt-10 mb-20">
                        <div className="rounded-full p-4 bg-green-400 w-[100px] h-auto aspect-square">
                            <p className="text-white font-bold text-[48px] text-center">
                                {user.userId ? user.name?.charAt(0) : "LR"}
                            </p>
                        </div>
                    </div>
                    <Navlinks />
                </div>
            </div>
        </div>
    )
}

export default Navbar
