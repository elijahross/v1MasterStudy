"use client"
import { login } from "@/actions/auth";
import { getSession } from "@/actions/session";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import Image from "next/image";
import loader from "../../public/loader.svg";

function LogIn() {
    const router = useRouter();
    const [session, setSession] = useState({} as any);
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState("" as string);

    useEffect(() => {
        getSession().then((session) => setSession(session));
    }, []);

    return (
        <div className="items-center flex-center h-fit max-w-md px-8 py-6 w-full  ">
            <form action={async (formData) => {
                await login(formData).then(() => router.push("/chat")).catch((err) => {if (err.message === "User not verified!") {router.push("/verification")}; setLoading(false); setValidationError(err); });
            }}>
                <div className="my-4  flex-col flex justify-between">
                    <label>Email: </label>
                    <input id="email" name="email" type="email" autoComplete="email" required={true} />
                </div>
                <div className="flex flex-col justify-between">
                    <label>Password:</label>
                    <input className="flex" id="password" name="password" autoComplete="current-password" type="password" required={true} />
                </div>
                {!validationError ? <p></p> : <p className="text-red-500 text-xs"> Whoops, looks like an error.. Try agan!</p>}
                <div className="w-full flex justify-center mt-4">
                    <button type="submit" className="border-2 btn" onClick={() => setLoading(true)}>{loading ? <Image src={loader} alt="loader-animation" width={20} height={20}/> : <>Login</>}</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn
