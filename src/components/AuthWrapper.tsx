"use client"
import { useState } from "react"
import LogIn from "./logIn"
import SignUp from "./signUp"
import Image from "next/image"
import lock from "../../public/lock.svg"
import newuser from "../../public/createuser.svg"


function AuthWrapper() {
    const [status, setStatus] = useState(true)
    return (
        <div className="relative max-w-2xl w-full flex flex-col justify-center items-center border-2 pt-4 rounded-xl bg-[#F7F7FF]">
            <div className="font-bold pb-4 w-full flex justify-between border-b-2 flex-row ">
            <button onClick={() => setStatus(true)} className={`btn ${status? "scale-110 font-bold" : "opycity-75"} m-auto transition-all duration-700`}>Sign Up</button>
            
            <button onClick={() => setStatus(false)} className={`btn ${status? "opacity-75" : "scale-110 font-bold "} m-auto transition-all duration-700`}>Log In</button>
            </div>
            <div className="flex flex-row justify-between items-center w-full py-4">
                <div className="min-w-[240px] sm:block hidden">
                    <div className="rounded-full w-fit m-auto">
                        {status ? <Image src={newuser} alt="new_user_icon" width={100} className="h-auto opacity-75" /> :
                            <Image src={lock} alt="password_icon" width={100} className="h-auto opacity-75" />}
                    </div>
                </div>
                <div className="w-full h-full items-center flex justify-center">
                    {status ? <SignUp /> : <LogIn />}
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper
