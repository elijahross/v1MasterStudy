"use client"
import { useState } from "react"
import LogIn from "./logIn"
import SignUp from "./signUp"
import Image from "next/image"
import lock from "../../public/lock.svg"
import newuser from "../../public/createuser.svg"
import warn from "../../public/warn.png"


function AuthWrapper() {
    const [status, setStatus] = useState(true);
    const [warning, SetWarning] = useState(true);
    return (
        <div className="relative max-w-2xl w-full flex flex-col justify-center items-center border-[1px] border-zinc2 pt-4 rounded-xl bg-zinc1">
            <div className="font-bold pb-4 w-full flex justify-between border-b-[1px] border-zinc2 flex-row ">
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
            <div className={`${warning ? "flex" : "hidden"} w-screen h-screen fixed top-0 left-0 items-center justify-center bg-[rgba(23,23,23,0.6)]`}>
            <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-[1px] border-zinc2 mb-10 px-6 py-4 max-w-2xl bg-zinc1`}>
                    <div className="flex flex-row items-center justify-center ml-2 w-full mb-6">
                        <Image src={warn} alt="alsst" className="w-[50px] h-[50px]" />
                        <h1 className="font-bold text-xl text-center self-center min-w-max">Trigger Warning</h1>
                    </div>
                    <p className="text mb-2">This study contains content related to harmful thoughts and emotional distress. Participants will be asked to engage with scenarios involving a friend experiencing harmful thoughts and suicidal ideation. If you are sensitive to these topics or are currently experiencing mental health difficulties, please consider carefully whether participation is appropriate for you at this time. In case of emergency or if you're experiencing distress, please call your local emergency service.</p>
                    <button onClick={() => SetWarning(false)} className="btn border-[1px] border-zinc2 mx-auto justify-self-center">Proceed</button>
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper
