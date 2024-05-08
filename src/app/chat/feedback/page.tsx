"use client"
import { useEffect, useState } from "react"
import { postFeedback } from "@/actions/feedback"
import { useRouter } from "next/navigation"
import { getSession } from "@/actions/session"
import Image from "next/image"
import people from "../../../../public/people.jpg";
import loader from "../../../../public/loader.svg"

    const stars = [
        { id: 1, selected: false, hov: false },
        { id: 2, selected: false, hov: false },
        { id: 3, selected: false, hov: false },
        { id: 4, selected: false, hov: false },
        { id: 5, selected: false, hov: false }
    ];

function FeedbackPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({} as any);
    const [newStars, setNewStars] = useState(stars);
    const [feed, setFeed] = useState(0);

    useEffect(() => {
        getSession().then((session) => setUser(session?.user));
    }, []);

    const handleSelect = (index: number) => {
        const updatedStars = stars.map((star, i) => {
            if (i <= index) {
                return { ...star, selected: true };
            }
            return { ...star, selected: false };
        });
        setFeed(index + 1)
        setNewStars(updatedStars);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await postFeedback(formData).then(() => router.push("/chat"))
    }

    return (
        <div className="w-full h-full items-center justify-center flex flex-col py-10">
            <Image src={people} alt="avatar" className="w-[400px] bg-clip-border rounded-full h-full mb-10" />
            <div className="flex flex-row ">
                {newStars.map((star, index) => (
                    <div key={star.id} className="w-10 h-10 m-4" onClick={() => handleSelect(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 37.3763" className={`${star.selected ? "fill-yellow-400" : "fill-transparent stroke-2 stroke-cyan-500"} hover:stroke-yellow-400 transition-all duration-700`}>
                            <polygon points="19.5 30.333 30.934 36.376 28.75 23.577 38 14.513 25.217 12.645 19.5 1 13.783 12.645 1 14.513 10.25 23.577 8.066 36.376 19.5 30.333" />
                        </svg>
                    </div>
                ))}
            </div>
                <h1 className="text-xl mb-6">
                    {user.name ? `Hi ${user.name}, would you like to share your state?` : 'Hello, would you like to share your state?'}
                </h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
                <input type="hidden" id="userId" name="userId" value={user.userId || ""} />
                <input type="hidden" id="stars" name="stars" value={feed || ""} />
                <textarea id="reply" name="reply" autoComplete="off" className="border-2 border-dark p-4 rounded-xl w-max-[480px] w-full flex text-dark felx-center items-center bg-transparent outline-none mb-4" placeholder="How was your expirience with us?" />
                <button type="submit" className="btn border-2 items-center flex justify-center">{loading ? <Image src={loader} alt="spinner" width={20} height={20} className="m-auto self-center"/> : "Update"}</button>
            </form>
        </div>
    );
}

export default FeedbackPage
