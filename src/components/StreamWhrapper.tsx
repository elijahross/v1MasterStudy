"use client"
import { useEffect, useState, useRef } from "react";
import { createSdpResponse } from "@/actions/createSdpResponse";
import { onIceCandidate } from "@/actions/onIceCandy";
import { createStream } from "@/actions/createStream";
import { deleteStream } from "@/actions/deleteStream";
import { askAi } from "@/actions/askAi";
import { handleStart } from "@/actions/handleStart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import send from "../../public/send.svg";
import loader from "../../public/loader.svg";
import { getSession } from "@/actions/session";
import timerImage from "../../public/timer.svg";

interface User {
    userId: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
}

const RTCPeerConnection = (
    window.RTCPeerConnection
).bind(window);

let peerConnection: RTCPeerConnection | null;
let sessionClientAnswer: RTCSessionDescriptionInit;
let streamId: string;
let sessionId: string;
let offer: RTCSessionDescriptionInit | undefined;
let iceServers: RTCIceServer[] | undefined;
let idleVideoElement: HTMLVideoElement;
let videoElement: HTMLVideoElement;
let statusDisplay: HTMLLabelElement;

export default function StreamWhrapper() {
    const router = useRouter();
    const [connectionSt, setConnectionSt] = useState('none' as string | undefined);
    const [streamingStatus, setStreamingStatus] = useState(false as boolean);
    const [playing, setPlaying] = useState(false as boolean);
    const [newResponse, setNewResponse] = useState("" as string | undefined);
    const [user, setUser] = useState({} as User | null);
    const [loading, setLoading] = useState(false);
    const [chatWindow, setChatWindow] = useState([]) as any;
    const [start, setStart] = useState(false);
    const [tasks, setTasks] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const refForm = useRef() as any;
    const scrolRef = useRef() as any;
    const inputRef = useRef() as any;
    const timer = [] as NodeJS.Timeout[];
    const timerArr = [] as NodeJS.Timeout[];
    let lastBytesReceived = 0;

    function playVideoElement(stream: MediaStream) {
        if(!videoElement.srcObject) {
            videoElement.srcObject = stream;
              // safari hotfix
            if (videoElement.paused) {
                videoElement
                .play()
                .then((_) => {})
                .catch((e) => {console.log(e)});
            }
        }
        videoElement.style.opacity = "100%";
        if (videoElement.paused) {
            videoElement
            .play()
            .then((_) => {})
            .catch((e) => {});
        }
        setPlaying(prev => !prev);
    }

    function onTrack(event: RTCTrackEvent) {
        if (!event.track) { return }
            timer.push(
                setInterval(async () => {
                    const stats = await peerConnection?.getStats(event.track).catch((error) =>{}).then((result: any)=> {
                    result?.forEach((report: any) => {
                        if (report.type === 'inbound-rtp' && report.kind === 'video' || report.type === 'inbound-rtp' && report.mediaType === 'video') {
                            const changeInUpstream = streamingStatus !== report.bytesReceived > lastBytesReceived;
                            if (changeInUpstream) {
                                playVideoElement(event.streams[0])
                                setStreamingStatus(report.bytesReceived > lastBytesReceived);
                            } else {videoElement.style.opacity = "0%";}
                                lastBytesReceived = report.bytesReceived;
                        }
                    })})
                }, 500))
        }

    async function handleDestroy() {
        try {
            setStreamingStatus(false);
            deleteStream(streamId, sessionId);
            closePC();
        } catch (e: any) {
            console.log(e);
            closePC();
        }
    }

    async function closePC() {
        const pc = peerConnection;
        if (!pc) return null;
        pc.close();
        pc.removeEventListener('icecandidate', (ev) => onIceCandidate, true);
        pc.removeEventListener('iceconnectionstatechange', () => console.log("ok"), true);
        pc.removeEventListener('connectionstatechange', () => { setConnectionSt(peerConnection?.connectionState); if (peerConnection?.connectionState === "connecting") { statusDisplay.innerText = "🟡 connecting" } else if (peerConnection?.connectionState === "connected") { statusDisplay.innerText = "🟢 online"; setStreamingStatus(false); } else { statusDisplay.innerText = "🔴 offline" } })
        pc.removeEventListener('track', (ev: RTCTrackEvent) => onTrack(ev), true);
        if (pc === peerConnection) {
            peerConnection = null;
            return null;
        }
    }

    async function handleConnect() {
        if (!peerConnection) {
            await createStream().then((res) => {
                streamId = res?.streamId || "";
                sessionId = res?.sessionId || "";
                offer = res?.offer || undefined;
                iceServers = res?.iceServers || undefined;
            }) as any;
            closePC();
            try {
                peerConnection = new RTCPeerConnection({ iceServers })
                peerConnection.addEventListener('icecandidate', async (ev: RTCPeerConnectionIceEvent) => {
                    if (ev.candidate) {
                        const { candidate, sdpMid, sdpMLineIndex } = ev.candidate;
                        await onIceCandidate(candidate, sdpMid, sdpMLineIndex, streamId, sessionId)
                    }
                }, true);
                peerConnection.addEventListener('connectionstatechange', () => { if (peerConnection?.connectionState === "connecting") { statusDisplay.innerText = "🟡 connecting" } else if (peerConnection?.connectionState === "connected") { statusDisplay.innerText = "🟢 online";} else { statusDisplay.innerText = "🔴 offline" } })
                peerConnection.addEventListener('iceconnectionstatechange', () => { if (peerConnection?.iceConnectionState === "failed" || peerConnection?.iceConnectionState === "closed") { setStreamingStatus(false); closePC(); } }, true);
                peerConnection.addEventListener('track', (ev: RTCTrackEvent) => onTrack(ev), true);

                if (offer === undefined) { console.log('offer is undefined'); return; };
                await peerConnection.setRemoteDescription(offer);
                sessionClientAnswer = await peerConnection.createAnswer() as any;
                await peerConnection.setLocalDescription(sessionClientAnswer);

                await createSdpResponse(streamId, sessionId, sessionClientAnswer);

            } catch (e: any) {
                setStreamingStatus(false);
                closePC();
                return;
            }
        }
    }

    useEffect(() => {
        const newConnection = async () => {
            await handleConnect().catch((error) => { handleDestroy(); });
        };
        statusDisplay = document.getElementById("status-display") as HTMLLabelElement;
        videoElement = document.getElementById('video-element') as HTMLVideoElement;
        idleVideoElement = document.getElementById('idle-video-element') as HTMLVideoElement;
        videoElement.style.opacity = "0%"
        getSession().then((res: any) => { setUser(res?.user); setChatWindow([{ role:"assistant", content: `Welcome ${res?.user?.name || ""}, my name is Kim. Here is your safe space where you can talk about everything you want.` }]) });

        timer.push(setTimeout(() => {
            newConnection();
        }, 100))

        return () => {
            timer.forEach((interval: NodeJS.Timeout) => clearInterval(interval));
            handleDestroy();
        };
    }, []);

    useEffect(() => {
        if (chatWindow.length > 0) {
            scrolRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [chatWindow]);

    useEffect(() => {
            setLoading(false);
            if (newResponse) {
            setChatWindow([...chatWindow, { role: "assistant", content: newResponse }]);
            setNewResponse(undefined);
        }
    }, [playing]);

    useEffect(() => {
        if (start) {
            timerArr.push(setInterval(() => {
                if (timeLeft === 0) {
                    router.push("chat/feedback/assessment");
                } else {
                    setTimeLeft(prev => prev - 1);
                    if (seconds === 0) {
                        setSeconds(prev => prev + 59);
                        setMinutes(prev => prev - 1);
                    } else {
                        setSeconds(prev => prev - 1);
                    }
                }
            }, 1000));
        }
        return () => { for (let i = 0; i < timerArr.length; i++) { clearInterval(timerArr[i]) } };
    }, [start, seconds]);


    useEffect(() => {
        if (peerConnection?.connectionState === 'disconnected') {
        const newConnection = async () => {
            await handleConnect().catch((error) => { handleDestroy(); });
        };
        timer.push(setTimeout(() => {
            newConnection();
        }, 2000))}
    }, [connectionSt]);

    async function submitForm(formData: any) {
        const results = await askAi(chatWindow, formData, user).catch((error) => { setChatWindow((prev: any) => { return [...prev, { role:"assistant", content: "Error:" + error }] }) }) as any;
        await handleStart(results, streamId, sessionId).catch(() => { setLoading(false); setChatWindow((prev: any) => { return [...prev, { role:"assistant", content: results }] }) });
        setNewResponse(results);
    }

    return (
        <div className="relative flex w-full h-screen min-h-[600px] flex-col items-center justify-between py-4">
            <div className="relative w-full xs:h-[30%] h-[100%] my-4 flex items-center m-auto mb-20">
                <div className="absolute md:top-[65px] top-[100%] flex sm:flex-row flex-col  items-center max-w-md">
                    <button onClick={() => {setTasks(true);}} className="sm:mr-4 sm:my-0 my-4 btn border-[1px]">Show Tasks</button>
                    <Image src={timerImage} alt="timer_icon" className="h-auto aspect-square w-[30px] sm:mr-4 opacity-75" />
                    <p className={`${minutes === 0 ? "text-red-400" : ""}`}>
                        {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                    </p>
                </div>
                <div className="w-[200px] h-[200px] absolute rounded-full right-0 -top-20 circle1" />
                <div className="w-[200px] h-[200px] absolute rounded-full top-32 right-64 circle2" />
                <div className="w-[250px] h-[250px] absolute right-0 top-0 rounded-full overflow-hidden z-auto md:mr-10 mr-0 z-10">
                    <video id="idle-video-element" src="/idle.mp4" autoPlay playsInline loop className="bg-clip-border w-full h-full"> #your Browser doesn't support this format</video>
                </div>
                <div className={` w-[250px] h-[250px] absolute right-0 top-0 rounded-full overflow-hidden z-auto md:mr-10 mr-0 z-20`}>
                    <video id="video-element" onEnded={(e) => {e.currentTarget.style.opacity="0%"}} src="/idle.mp4" autoPlay playsInline={true} className={`bg-clip-border w-full h-full transition-all duration-500`}> #your Browser doesn't support this format</video>
                </div>
                <div className="absolute text-sm top-[260px] md:right-[100px] right-[60px] rounded-full px-2 py-1 bg-gray-200 h-fit w-fit">status: <label id="status-display">🔴 offline</label></div>
            </div>
            <div id="chatContainer" className="chatContainer max-h-[600px] h-full w-full flex flex-col overflow-y-auto mb-8 py-8">
                {chatWindow.map((msg: any, index: number) => (
                    <div key={index} className={`w-full my-2 flex text-sm ${msg.role == "user" ? "justify-start " : "justify-end "}`}>
                        <div className={`max-w-[380px] w-fit flex p-4 rounded-2xl bg-gray-200 items-center`}>
                            <p className="">{msg.content}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrolRef} />
            </div>
            <div className="w-full flex flex-row">
                <form id="form" ref={refForm} className="w-full flex flex-row items-center justify-center" onSubmit={() => { setLoading(true); setChatWindow([...chatWindow, { role: "user", content: inputRef.current.value }]) }} action={(formData) => { submitForm(formData); refForm.current.reset() }}>
                    <input ref={inputRef} name="text" type="text" maxLength={400} autoComplete="off" placeholder="Start Conversation ..." className="border-2 border-light p-4 rounded-full w-full flex felx-center items-center text-gray bg-transparent outline-none" />
                    <button type="submit" className="ml-4 p-2 border-light hover:bg-green-300 transition-all duration-1000 active:scale-90 rounded-full border-2"><Image src={loading ? loader : send} alt="icon_send" className="h-auto aspect-square w-[50px] opacity-75 p-2" /></button>
                </form>
            </div>
            <div className={`${tasks ? "block" : "hidden"} z-90 fixed top-0 left-0 w-full h-full bg-[rgba(23,23,23,0.6)] flex items-center justify-center`}>
                <div className="flex flex-col items-center bg-white p-8 rounded-xl max-w-2xl">
                    <div className="text-left w-full">
                        <ul className="list-disc ml-4 mb-2">
                            <li>Initiate the conversation</li>
                            <li>Present a scenario involving a friend with thoughts of self-harm and ask for advice.</li>
                            <li>Describe feeling overwhelmed with work/study responsibilities and experiencing sleep issues.</li>
                            <li>Mention the situation where you lost control and emotionaly outbrust on someone.</li>
                            <li>Complaine about your partner's behavior with patriarchy/matriarchy tendency.</li>
                            <li>Share an attempt to cope with your stress trought increased consume of food, alcohol ect.</li>
                        </ul>
                        <span className="mb-2">If you are experiencing technical problems, please <a href="mailto:service@ml-canvas.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 cursor-pointer">contact us</a></span>
                    </div>
                    <button onClick={() => {setTasks(false);}} className="btn border-2">Continue</button>
                </div>
            </div>
            <div className={`${start ? "hidden" : "block"} z-90 fixed top-0 left-0 w-full h-full bg-[rgba(23,23,23,0.6)] flex items-center justify-center`}>
                <div className="flex flex-col items-center bg-white p-8 rounded-xl max-w-2xl">
                    <h1 className="text-2xl text-center mt-4 mb-8">Are you ready?</h1>
                    <div className="text-left w-full">
                        <p className="mb-2">1. Please be sure that you have found a quiet place without distractions</p>
                        <p className="mb-2">2. The conversation will last for 10 minutes, and you will be redirected to the questionnaire straight afterward</p>
                        <p className="mb-2">3. Use your social expirience to engage naturally while completing these tasks:</p>
                        <ul className="list-disc ml-4 mb-2">
                            <li>Initiate the conversation</li>
                            <li>Present a scenario involving a friend with thoughts of self-harm and ask for advice.</li>
                            <li>Describe feeling overwhelmed with work/study responsibilities and experiencing sleep issues.</li>
                            <li>Mention the situation where you lost control and emotionaly outbrust on someone.</li>
                            <li>Complaine about your partner's behavior with patriarchy/matriarchy tendency.</li>
                            <li>Share an attempt to cope with your stress trought increased consume of food, alcohol ect.</li>
                        </ul>
                        <p className="mb-2">If you are experiencing technical problems, please contact service@ml-canvas.com</p>
                    </div>
                    <button onClick={() => {setStart(true); videoElement.play(); idleVideoElement.play()}} className="btn border-2">Start</button>
                </div>
            </div>
        </div>
    )
}