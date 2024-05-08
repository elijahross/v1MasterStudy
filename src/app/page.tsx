import { getSession } from "@/actions/session"
import { redirect } from 'next/navigation'
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import timer from "../../public/world.svg"
import login from "../../public/login.svg"

async function Home() {
    const session = await getSession();
    if (session) {
        return redirect('/chat');
    } else
        return (
            <main className="flex flex-col w-full h-full items-center justify-center">
                <div className="w-full flex flex-row justify-between sm:px-8 px-4 items-center sm:mt-10 mt-4 mb-10">
                    <Link href="/" className={`hover:scale-105 active:scale-100 transition-all duration-700 cursor-pointer`} >
                        <Image src={timer} alt="altss" width={30} className="h-auto" />
                    </Link>
                    <Link href="/authorization" className={`btn flex flex-row items-center`} >
                        <Image src={login} alt="alsst" width={30} className="h-auto" />
                        <p className="ml-4">Sign up</p></Link>
                </div>
                <div className="flex flex-col items-center justify-center mb-20">
                    <h1 className="text-4xl font-bold sm:text-start text-center mb-4">Welcome to TheLivingRoom</h1>
                    <p>Mental Health Chat-Agent</p>
                </div>
                <div className="flex md:flex-row flex-col justify-between w-full">
                    <div className="w-full flex flex-col items-center sm:px-8 px-2 mb-20">
                        <h2 className="mb-4 text-xl font-bold">About this project</h2>
                        <p>This is a research project for graduation thesis. The main goals is to evaluate the capabiliites of ai-based support systems.
                            <br/><br/> TheLivingRoom is an innovative mental health chat-agent that provides a natural conversation to help users reflect on their day-to-day experiences. Designed with empathy and understanding, TheLivingRoom creates a safe and non-judgmental space for individuals to share their thoughts, emotions, and personal stories.
                        </p>
                    </div>
                    <div className="flex flex-col items-center w-full sm:px-8 px-2 mb-20">
                        <h2 className="mb-4 text-xl font-bold">Participation Agreement</h2>
                        <p>Participants automatically take part in a raffle with a cash prize of 100$. The winner will be notified by email on August 15th.
                        <br/><br/>Participation in TheLivingRoom project requires a commitment to open and honest dialogue. The study calls for a conversation with a chat-agent lasting at least 10 minutes. After this interaction, participants must complete a short survey consisting of 25 questions to provide feedback crucial for the research.
                        </p>
                    </div>
                </div>
                <Footer />
            </main>
        )
}

export default Home
