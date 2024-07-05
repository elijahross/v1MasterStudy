"use client"
import Image from "next/image";
import people from "../../public/stillAvatar.png";
import { askAi } from "@/actions/askAi";
import { useRef, useState, useEffect } from "react";
import { getSession } from "@/actions/session";
import { useRouter } from "next/navigation";
import loader from "../../public/loader.svg";
import send from "../../public/send.svg";
import timer from "../../public/timer.svg";

interface User {
    userId: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
}

function StreamFallback(session:any) {
    const router = useRouter();
    const [user, setUser] = useState({} as User | null);
    const [loading, setLoading] = useState(false);
    const [chatWindow, setChatWindow] = useState([]) as any;
    const [start, setStart] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const refForm = useRef() as any;
    const scrolRef = useRef() as any;
    const inputRef = useRef() as any;
    const timerArr =[] as NodeJS.Timeout[];
    useEffect(() => {
        getSession().then((res: any) => { setUser(res?.user); setChatWindow([{ ai: `Welcome ${res?.user?.name || ""}, my name is Kim. Here is your safe space where you can talk about everything you want.` }]) });
    }, []);
    useEffect(() => {
        if (chatWindow.length > 0) {
            scrolRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [chatWindow]);
    useEffect(() => {
        if (start){
            timerArr.push(setInterval(() => {
                if(timeLeft === 0) {
                    router.push("chat/feedback/assessment");
                } else{
                setTimeLeft(prev => prev - 1);
                if (seconds === 0) {
                    setSeconds(prev => prev + 59);
                    setMinutes(prev => prev - 1);
                } else {
                    setSeconds(prev => prev - 1);
                }}
            } , 1000));
        }
        return () => {for (let i = 0; i < timerArr.length; i++) {clearInterval(timerArr[i])}};
    }, [start, seconds]);


    async function submitForm(formData: any) {
        await askAi(formData, user).then((results) => {setChatWindow((prev: any) => { return [...prev, { ai: results || "... No comments" }] }) }).catch((error) =>{setChatWindow((prev: any) => { return [...prev, { ai: "Error:" + error}]})});
        setLoading(false);
    }

    return (
        <div className="relative flex w-full h-screen flex-col items-center justify-between py-4">
            <div className="relative w-full xs:h-[30%] h-[100%] my-4 flex items-center m-auto">
                <div className="absolute md:top-[65px] top-[100%] flex flex-row items-center">
                    <Image src={timer} alt="timer_icon" className="h-auto aspect-square w-[30px] mr-4 opacity-75" />
                    <p className={`${minutes===0 ? "text-red-400" :""}`}>
                        {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                    </p>
                </div>
                <div className="w-[200px] h-[200px] absolute rounded-full right-0 -top-20 circle1 z-20" />
                <div className="w-[200px] h-[200px] absolute rounded-full top-32 right-64 circle2 z-20" />
                <div className="w-[250px] h-[250px] absolute right-0 top-0 rounded-full overflow-hidden z-auto md:mr-10 mr-0">
                    <Image src={people} alt="avatar_image" className="bg-clip-border w-full h-full" />
                </div>
                <div className="absolute text-sm top-[260px] md:right-[100px] right-[60px] rounded-full px-2 py-1 bg-gray-200 h-fit w-fit">status:  🟢 online</div>
            </div>
            <div id="chatContainer" className="chatContainer w-full h-full pt-10 flex flex-col overflow-y-auto mb-8 z-0">
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
                <form id="form" ref={refForm} className="w-full flex flex-row items-center justify-center" action={(formData) => { refForm.current.reset(); submitForm(formData) }} onSubmit={() => {setLoading(true); setChatWindow([...chatWindow, { user: inputRef.current.value }]) }}>
                    <input ref={inputRef} name="text" type="text" maxLength={400} autoComplete="off" placeholder="Start Conversation ..." className="border-2 p-4 rounded-full w-full flex felx-center items-center text-gray bg-transparent outline-none" />
                    <button type="submit" className="ml-4 p-2 hover:bg-green-300 transition-all duration-1000 active:scale-90 rounded-full border-2"><Image src={loading ? loader : send} alt="icon_send" className="h-auto aspect-square w-[50px] opacity-75 p-2 " /></button>
                </form>
            </div>
            <div className={`${start? "hidden" : "block"} z-90 fixed top-0 left-0 w-full h-full bg-[rgba(23,23,23,0.6)] flex items-center justify-center`}>
                <div className="flex flex-col items-center bg-white p-8 rounded-xl max-w-2xl">
                    <h1 className="text-2xl text-center mt-4 mb-8">Are you ready?</h1>
                    <div className="text-left w-full">
                        <p className="mb-4">1. Please be sure that you have found a quiet place without distractions</p>
                        <p className="mb-4">2. The conversation will last for 10 minutes, and you will be redirected to the questionnaire straight afterward</p>
                        <p className="mb-4">3. TheLivingRoom is designed to provide support and guidance in form of an open-ended conversation. You can either select a conversation topic which relates to your own needs or just role-play in order to discover the capabilities of this platform.</p>
                    </div>
                    <button onClick={() => setStart(true)} className="btn border-2">Start</button>
                </div>
            </div>
        </div>
    )
}

export default StreamFallback
