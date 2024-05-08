"use client"
import { setAssessmentValues } from "@/actions/assessment";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loader from "../../../../../public/loader.svg";

function AssessmentPage() {
    const router = useRouter();
    const [err, setErr] = useState("" as string);
    const [start, setStart] = useState(false);
    const [loading, setLoading] = useState(false);
    const questions = [
        {
            question: "1. Using this platform was frustrating experience."
        },
        {
            question: "2. This platform was easy to use."
        },
        {
            question: "3. The agent seems to have a lot in common with me."
        },
        {
            question: "4. I can identify with the personality traits exhibited by the agent."
        },
        {
            question: "5. The agent appears to have thoughts and values similar to mine."
        },
        {
            question: "6. The chat-agent doesn't represent someone I could be friends with."
        },
        {
            question: "7. The chat-agent can easily understand if I want to change the topic of conversation."
        },
        {
            question: "8. The agent can pick up on the implied meaning behind what I say, not just the literal words."
        },
        {
            question: "9. The agent responses show it gets emotionally involved when I describe personal problems."
        },
        {
            question: "10. The agent responses look emotionally affected when I mention distressing news or events."
        },
        {
            question: "11. The agent sometimes struggles to respond appropriately in line with natural conversation flow."
        },
        {
            question: "12. The agent has difficulty judging if a response might come across as rude or inappropriate."
        },
        {
            question: "13. The chatbot seems genuinely caring and focused on helping me."
        },
        {
            question: "14. The chatbot doesn't find our conversational interactions confusing or unclear."
        },
        {
            question: "15. The agent's messages make me feel it can sense and relate to my feelings"
        },
        {
            question: "16. The agent doesn't appear very disturbed or concerned when I describe difficult situations."
        },
        {
            question: "17. I can trust the agent to keep my personal information confidential."
        },
        {
            question: "18. The agent's responses instill confidence that it understands my needs."
        },
        {
            question: "19. The agent seems honest and transparent in its communication."
        },
        {
            question: "20. The agent's responses make me feel like I can rely on its guidance."
        },
        {
            question: "21. The agent seems knowledgeable about mental health topics."
        },
        {
            question: "22. I feel that the agent can provide credible and evidence-based information."
        },
        {
            question: "23. It feels familiar to communicate with the agent about my issues."
        },
        {
            question: "24. The agent's way of communication appears well-informed and expert."
        },
        {
            question: "25. I perceive the agent as reliable source of mental health support."
        }
    ];

    return (
        <div className="relative py-10 flex flex-col w-full h-full justify-center sm:px-10 px-4">
            <div className="w-full sm:mb-20 mb-10">
                <h1 className="text-center text-2xl font-bold mb-4">Final Evaluation</h1>
                <p className="text-center text-sm">Please take your time to give most precise information about your experience with our chat-agent</p>
            </div>
            <div>
                <form className="w-full" action={async(formData) => await setAssessmentValues(formData).then(() => router.push("/chat/feedback")).catch((error: Error)=> {setLoading(false); setErr(error.message)})} onSubmit={() => setLoading(true)}>
                    {questions.map((q, index) => (
                        <div key={index} className="mb-8">
                            <LikertScale question={q.question} index={index+1} />
                        </div>
                    ))}
                    <p className="text-red-400 text-center mt-4">{err}</p>
                    <button className="btn border-2 w-fit m-auto mt-8 flex justify-self-center">{loading ? <Image src={loader} alt="loader_icon" width={20} height={20} /> : "Save & Quit"}</button>
                </form>
            </div>
            <div className={`${start ? "hidden" : "block"} md:pl-[400px] sm:py-0 py-10 pl-[0px] z-90 fixed top-0 left-0 w-full h-full bg-[rgba(23,23,23,0.6)] flex items-center justify-center`}>
                <div className="flex flex-col bg-white p-8 rounded-xl sm:max-w-[80%] max-w-screen max-h-screen overflow-auto">
                    <h2 className="text-2xl text-center mt-4 mb-8">Instructions</h2>
                    <ol>
                        <li className="mb-4">You will be presented with a series of statements related to your experience with the chat-agent.</li>
                        <li>For each statement, indicate your level of agreement by selecting the appropriate rating on the scale provided:</li>
                        <li className="mb-4 ml-4">
                            1 - Strongly Disagree<br />
                            2 - Disagree<br />
                            3 - Somewhat Disagree<br />
                            4 - Neither Agree nor Disagree<br />
                            5 - Somewhat Agree<br />
                            6 - Agree<br />
                            7 - Strongly Agree
                        </li>
                        <li className="mb-4">There are no right or wrong answers. We are interested in your honest perceptions and opinions.</li>
                        <li className="mb-4">If a statement seems ambiguous or unclear, respond based on your best interpretation.</li>
                    </ol>
                    <p className="mb-4">Thank you again for your time and valuable input. Your participation is greatly appreciated!</p>
                    <button className="btn border-2 w-fit m-auto mt-4" onClick={() => setStart(true)}>Start Assessment</button>
                </div>
            </div>
        </div>
    )
}

export default AssessmentPage

export function LikertScale({question, index}: {question: string, index: number}) {
    return (
        <div className="flex flex-col my-8">
            <label className="mb-4 text-xl">{question}</label>
            <div className="range-labels flex justify-between text-sm">
                <span>stronly disagre</span>
                <span>strongly agree</span>
            </div>
            <div className="w-[90%] m-auto">
                <div className="w-full range-labels flex justify-between px-2 text-sm">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                </div>
                <input className="w-full" type="range" min={1} max={7} name={`qa${index}`} id={`qa${index}`} />
            </div>
        </div>
    )
};