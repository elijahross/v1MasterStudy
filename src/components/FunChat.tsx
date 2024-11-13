"use client"
import Image from "next/image";
import people from "../../public/stillAvatar.png";
import { useRef, useState, useEffect } from "react";
import { getSession } from "@/actions/session";
import send from "../../public/send.svg";

interface User {
    userId: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
}

function FunChat(session:any) {
    const [user, setUser] = useState({} as User | null);
    const [chatWindow, setChatWindow] = useState([]) as any;
    const scrolRef = useRef() as any;
    const inputRef = useRef() as any;
    useEffect(() => {
        getSession().then((res: any) => { setUser(res?.user); setChatWindow([{ ai: `Thank you ${res?.user?.name || ""}, for your valuable contribution to our research endeavor. This study has focused on examining participants' cognitive and emotional responses to various stimuli presented through diverse interface modalities. In particular we've investigated potential correlations between perceived trust/credibility and different interface design elements. Should you wish to be informed of the study's findings or get the prolific accreditation, please direct your inquiry to our research team at service@ml-canvas.com.` }]) });
    }, []);

    useEffect(() => {
        if (chatWindow.length > 0) {
            scrolRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [chatWindow]);


    return (
        <div className="relative flex w-full h-screen flex-col items-center justify-between py-4">
            <div className="relative w-full xs:h-[30%] h-[30%] min-h-[250px] my-4 flex items-center m-auto">
                <div className="w-[200px] h-[200px] absolute rounded-full right-0 -top-20 circle1 z-20" />
                <div className="w-[200px] h-[200px] absolute rounded-full top-32 right-64 circle2 z-20" />
                <div className="w-[250px] h-[250px] absolute right-0 top-0 rounded-full overflow-hidden z-auto md:mr-10 mr-0">
                    <Image src={people} alt="avatar_image" className="bg-clip-border w-full h-full" />
                </div>
            </div>
            <div id="chatContainer" className="chatContainer w-full h-full pt-10 flex flex-col overflow-y-auto mb-8">
                {chatWindow.map((msg: any, index: number) => (
                    <div key={index} className={`w-full my-2 flex text-sm ${msg.user ? "justify-start " : "justify-end "}`}>
                        <div className={`max-w-[380px] w-fit flex p-4 rounded-2xl bg-gray-200 items-center`}>
                            <p className="">{msg.user || msg.ai}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrolRef} />
            </div>
            <div className="w-full">
                <form id="form" className="w-full flex flex-row items-center justify-center" onSubmit={(e) => {e.preventDefault(); setChatWindow([...chatWindow, { user: inputRef.current.value }]); e.currentTarget.reset(); } }>
                    <input ref={inputRef} name="text" type="text" maxLength={400} autoComplete="off" placeholder="Start Conversation ..." className="border-2 border-light p-4 rounded-full w-full flex felx-center items-center text-gray bg-transparent outline-none" />
                    <button type="submit" className="ml-4 p-2 border-light hover:bg-green-300 transition-all duration-1000 active:scale-90 rounded-full border-2"><Image src={send} alt="icon_send" className="h-auto aspect-square w-[50px] opacity-75 p-2" /></button>
                </form>
            </div>
        </div>
    )
}

export default FunChat
