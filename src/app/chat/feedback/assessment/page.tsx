"use client"
import { setAssessmentValues1, setAssessmentValues2, setAssessmentValues3, setAssessmentValues4, setAssessmentValues5, setAssessmentValues6 } from "@/actions/assessment";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loader from "../../../../../public/loader.svg";

function AssessmentPage() {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [err, setErr] = useState("" as string);
    const [start, setStart] = useState(false);
    const [loading, setLoading] = useState(false);
    const questions1 = [
        {
            question: "1. I find this AI agent intelligent."
        },
        {
            question: "2. This AI agent seems well-trained."
        },
        {
            question: "3. I feel that this AI agent cares about me."
        },
        {
            question: "4. This AI agent appears honest."
        },
        {
            question: "5. I believe this AI agent has my interests at heart."
        },
        {
            question: "6. I find this AI agent trustworthy."
        },
        {
            question: "7. This AI agent seems to have expertise."
        },
        {
            question: "8. This AI agent doesn't come across as self-centered."
        },
        {
            question: "9. I feel this AI agent is concerned with my well-being."
        },
        {
            question: "10. I perceive this AI agent as honorable."
        }];
    const questions2 = [
        {
            question: "11. This AI agent appears well-informed."
        },
        {
            question: "12. I believe this AI agent behaves morally."
        },
        {
            question: "13. This AI agent seems competent."
        },
        {
            question: "14. I find this AI agent's responses ethical."
        },
        {
            question: "15. This AI agent appears sensitive to my needs."
        },
        {
            question: "16. I perceive this AI agent as intellectually capable."
        },
        {
            question: "17. This AI agent comes across as genuine."
        },
        {
            question: "18. I feel this AI agent is understanding of my situation."
        },
        {
            question: "19. I am confident in the AI. I feel that it works well."
        },
        {
            question: "20. The outputs of the AI are very predictable."
        }];
    const questions3 = [{
        question: "21. The AI is very reliable. I can count on it to be correct all the time."
    },
    {
        question: "22. I feel safe that when I rely on the AI I will get the right answers."
    },
    {
        question: "23. The AI is efficient in that it works very quickly."
    },
    {
        question: "24. The AI can perform the task better than a novice human user."
    },
    {
        question: "25. I like using the AI for decision making."
    },
    {
        question: "26. The AI agent was easy to use."
    },
    {
        question: "27. Communication with the AI agent was clear."
    },
    {
        question: "28. I was immediately made aware of what information the AI agent can give me."
    },
    {
        question: "29. The interaction with the AI agent felt like an ongoing conversation."
    },
    {
        question: "30. The AI agent was able to keep track of context."
    }];
    const questions4 = [{
        question: "31. The AI agent could handle situations in which the line of conversation was not clear."
    },
    {
        question: "32. The AI agent's responses were easy to understand."
    },
    {
        question: "33. I find that the AI agent understands what I want and helps me achieve my goal."
    },
    {
        question: "34. The AI agent gives me the appropriate amount of information."
    },
    {
        question: "35. The AI agent only gives me the information I need."
    },
    {
        question: "36. I feel like the AI agent's responses were accurate."
    },
    {
        question: "37. The AI agent considered my mental state."
    },
    {
        question: "38. The AI agent seemed emotionally intelligent."
    },
    {
        question: "39. The AI agent expressed emotions."
    },
    {
        question: "40. The AI agent sympathized with me."
    }];
    const questions5 = [{
        question: "41. The AI agent showed interest in me."
    },
    {
        question: "42. The AI agent supported me in coping with an emotional situation."
    },
    {
        question: "43. The AI agent understood my goals."
    },
    {
        question: "44. The AI agent understood my needs."
    },
    {
        question: "45. I trusted the AI agent."
    },
    {
        question: "46. The AI agent understood my intentions."
    },
    {
        question: "47. I like to occupy myself in greater detail with technical systems."
    },
    {
        question: "48. I like testing the functions of new technical systems."
    },
    {
        question: "49. I predominantly deal with technical systems because I have to."
    },
    {
        question: "50. When I have a new technical system in front of me, I try it out intensively."
    },];
    const questions6 = [{
        question: "51. I enjoy spending time becoming acquainted with a new technical system."
    },
    {
        question: "52. It is enough for me that a technical system works; I don't care how or why."
    },
    {
        question: "53. I try to understand how a technical system exactly works."
    },
    {
        question: "54. It is enough for me to know the basic functions of a technical system."
    },
    {
        question: "55. I try to make full use of the capabilities of a technical system."
    }];

    return (
        <div className="relative py-10 flex flex-col w-full h-full justify-center sm:px-10 px-4">
            <div className="w-full sm:mb-20 mb-10">
                <h1 className="text-center text-2xl font-bold mb-4">Final Evaluation</h1>
                <p className="text-center text-sm">All questions must be answered. Please take your time to give most precise information about your experience with our chat-agent</p>
            </div>
            <div className="px-10">
                    <div className="progress-bar__container w-full mx-20">
                        <div className="progress-bar__progress w-[20%]"></div>
                    </div>
                <form className={`${page == 0 ? "fade-in" : "hidden"} w-full`} action={async (formData) => {
                    const res = await setAssessmentValues1(formData).catch((error: Error) => { setLoading(false); setErr(error.message) });
                    setLoading(false);
                    if (res?.status === "200") {
                        setPage(page + 1); 
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth' // For smooth scrolling
                        });
                    } else if (res?.status === "500") {
                        setErr(res.message);
                    }
                }} onSubmit={() => setLoading(true)}>
                        {questions1.map((q, index) => (
                            <div key={q.question } className={`mb-8`}>
                                <LikertScale question={q.question} index={index + 1} />
                            </div>
                        ))}
                    <p className="text-red-400 text-center mt-4">{err}</p>
                    <div className="flex flex-row">
                        <button className={`flex btn border-2 w-fit m-auto mt-4 justify-self-center`}>{loading ? <Image src={loader} alt="loader_icon" width={20} height={20} /> : "Next"}</button>
                    </div>
                </form>
                <form className={`${page == 1 ? "fade-in" : "hidden"} w-full`} action={async (formData) => {
                    const res = await setAssessmentValues2(formData).catch((error: Error) => { setLoading(false); setErr(error.message) });
                    setLoading(false);
                    if (res?.status === "200") {
                        setPage(page + 1); 
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth' // For smooth scrolling
                        });
                    } else if (res?.status === "500") {
                        setErr(res.message);
                    }
                }} onSubmit={() => setLoading(true)}>
                        {questions2.map((q, index) => (
                            <div key={q.question } className={`mb-8`}>
                                <LikertScale question={q.question} index={index + 11} />
                            </div>
                        ))}
                <p className="text-red-400 text-center mt-4">{err}</p>
                    <div className="flex flex-row">
                        <div className={`flex btn border-2 w-fit m-auto mt-4 justify-self-center`} onClick={() => {setPage(page - 1)}}>Previous</div>
                        <button className={`flex btn border-2 w-fit m-auto mt-4 justify-self-center`}>{loading ? <Image src={loader} alt="loader_icon" width={20} height={20} /> : "Next"}</button>
                    </div>
                </form>
                <form className={`${page == 2 ? "fade-in" : "hidden"} w-full`} action={async (formData) => {
                    const res = await setAssessmentValues3(formData).catch((error: Error) => { setLoading(false); setErr(error.message) });
                    setLoading(false);
                    if (res?.status === "200") {
                        setPage(page + 1); 
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth' // For smooth scrolling
                        });
                    } else if (res?.status === "500") {
                        setErr(res.message);
                    }
                }} onSubmit={() => setLoading(true)}>
                        {questions3.map((q, index) => (
                            <div key={q.question } className={`mb-8`}>
                                <LikertScale question={q.question} index={index + 21} />
                            </div>
                        ))}
                    <p className="text-red-400 text-center mt-4">{err}</p>
                    <div className="flex flex-row">
                        <div className={`flex btn border-2 w-fit m-auto mt-4 justify-self-center`} onClick={() => {setPage(page - 1)}}>Previous</div>
                        <button className={`flex btn border-2 w-fit m-auto mt-4 justify-self-center`}>{loading ? <Image src={loader} alt="loader_icon" width={20} height={20} /> : "Next"}</button>
                    </div>
                </form>
                <form className={`${page == 3 ? "fade-in" : "hidden"} w-full`} action={async (formData) => {
                    const res = await setAssessmentValues4(formData).catch((error: Error) => { setLoading(false); setErr(error.message) });
                    setLoading(false);
                    if (res?.status === "200") {
                        setPage(page + 1); 
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth' // For smooth scrolling
                        });
                    } else if (res?.status === "500") {
                        setErr(res.message);
                    }
                }} onSubmit={() => setLoading(true)}>
                        {questions4.map((q, index) => (
                            <div key={q.question } className={`mb-8`}>
                                <LikertScale question={q.question} index={index + 31} />
                            </div>
                        ))}
                    <p className="text-red-400 text-center mt-4">{err}</p>
                    <div className="flex flex-row">
                        <div className={`flex btn border-2 w-fit m-auto mt-4 justify-self-center`} onClick={() => {setPage(page - 1)}}>Previous</div>
                        <button className={`flex btn border-2 w-fit m-auto mt-4 justify-self-center`}>{loading ? <Image src={loader} alt="loader_icon" width={20} height={20} /> : "Next"}</button>
                    </div>
                </form>
                <form className={`${page == 4 ? "fade-in" : "hidden"} w-full`} action={async (formData) => {
                    const res = await setAssessmentValues5(formData).catch((error: Error) => { setLoading(false); setErr(error.message) });
                    setLoading(false);
                    if (res?.status === "200") {
                        setPage(page + 1); 
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth' // For smooth scrolling
                        });
                    } else if (res?.status === "500") {
                        setErr(res.message);
                    }
                }} onSubmit={() => setLoading(true)}>
                        {questions5.map((q, index) => (
                            <div key={q.question } className={`mb-8`}>
                                <LikertScale question={q.question} index={index + 41} />
                            </div>
                        ))}
                    <p className="text-red-400 text-center mt-4">{err}</p>
                    <div className="flex flex-row">
                        <div className={`flex btn border-2 w-fit m-auto mt-4 justify-self-center`} onClick={() => {setPage(page - 1)}}>Previous</div>
                        <button className={`flex btn border-2 w-fit m-auto mt-4 justify-self-center`}>{loading ? <Image src={loader} alt="loader_icon" width={20} height={20} /> : "Next"}</button>
                    </div>
                </form>
                    <form className={`${page == 5 || page == 9 ? "fade-in" : "hidden"} w-full`} action={async (formData) => {
                        const res = await setAssessmentValues6(formData).catch((error: Error) => { setLoading(false); setErr(error.message) });
                        setLoading(false);
                        if (res?.status === "200") {
                            router.push("/chat/feedback");
                        } else if (res?.status === "500") {
                            setErr(res.message);
                        }
                    }} onSubmit={() => setLoading(true)}>
                        {questions6.map((q, index) => (
                            <div key={q.question } className={`mb-8`}>
                                <LikertScale question={q.question} index={index + 51} />
                            </div>
                        ))}
                        <p className="text-red-400 text-center mt-4">{err}</p>
                        <div className="flex flex-row">
                            <div className={`${page == 9 || page == 0 ? "hidden" : "flex"} btn border-2 w-fit m-auto mt-4 justify-self-center`} onClick={() => {setPage(page - 1)}}>Previous</div>
                            <div className={`${page == 5 || page == 9 ? "hidden" : "flex"} btn border-2 w-fit m-auto mt-4 justify-self-center`} onClick={() => {setPage(page + 1); window.scrollTo({
                                top: 0,
                                behavior: 'smooth' // For smooth scrolling
                            });}}>Next</div>
                            <button className={`${page == 5 || page == 9 ? "flex" : "hidden"} btn border-2 w-fit m-auto mt-4 justify-self-center`} onClick ={() => {setPage(9)}}>{loading ? <Image src={loader} alt="loader_icon" width={20} height={20} /> : "Submit"}</button>
                        </div>
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

function LikertScale({ question, index }: { question: string, index: number }) {
    return (
        <div className="flex flex-col my-8 pb-10">
            <label className="mb-4 text-xl">{question}</label>
            <div className="range-labels flex justify-between text-sm">
                <span>stronly disagre</span>
                <span>strongly agree</span>
            </div>
            <div className="w-[90%] m-auto">
                <div className="w-full range-labels flex justify-between px-1 text-sm">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                </div>
                <div className="flex justify-between">
                    <input type="radio" name={`qa${index}`} id={`qa${index}-1`} value="1" required />
                    <input type="radio" name={`qa${index}`} id={`qa${index}-2`} value="2" required />
                    <input type="radio" name={`qa${index}`} id={`qa${index}-3`} value="3" required />
                    <input type="radio" name={`qa${index}`} id={`qa${index}-4`} value="4" required />
                    <input type="radio" name={`qa${index}`} id={`qa${index}-5`} value="5" required />
                    <input type="radio" name={`qa${index}`} id={`qa${index}-6`} value="6" required />
                    <input type="radio" name={`qa${index}`} id={`qa${index}-7`} value="7" required />
                </div>
            </div>
        </div>
    )
};