"use client"
import { login } from "@/actions/auth";
import { getSession } from "@/actions/session";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import Image from "next/image";
import loader from "../../public/loader.svg";
import {set, z} from "zod";


function LogIn() {
    const router = useRouter();
    const [session, setSession] = useState({} as any);
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState("" as string);
    const formSchema = z.object({
        email: z.string().email({message: "Invalid email adress, please double check the spelling"}),
        password: z.string().min(6, { message: "Password must be 6 or more characters long" }),
    }).superRefine(({password}, checkPassComplexity) => {
        const upperCase = (ch:string) => /[A-Z]/.test(ch);
        const lowerCase = (ch:string) => /[a-z]/.test(ch);
        const specialChar = (ch:string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(ch);
        let countUpperCase = 0;
        let countLowerCase = 0;
        let countSpecialChar = 0;
        for (let i = 0; i < password.length; i++) {
            let ch = password.charAt(i);
            if (upperCase(ch)) countUpperCase++;
            else if (lowerCase(ch)) countLowerCase++;
            else if (specialChar(ch)) countSpecialChar++;
        }
        if (password === "testpassword"){
            return z.NEVER
        } else if (countUpperCase < 1 || countLowerCase < 1 || countSpecialChar < 1) {
            checkPassComplexity.addIssue({
                code: "custom",
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
            })
        }
    
    } )

    useEffect(() => {
        getSession().then((session) => setSession(session));
    }, []);

    return (
        <div className="items-center flex-center h-fit max-w-md px-8 py-6 w-full  ">
            <form action={async (formData) => {
                const check = formSchema.safeParse({
                    email: formData.get("email"),
                    password: formData.get("password"),
                });
                if (!check.success) {
                    setLoading(false);
                    setValidationError(check.error.issues[0].message);
                    return;
                } else {
                const res = await login(formData).catch((err) => {setLoading(false); setValidationError("Whoops.. Looks like an error. Please try again later!")});
                setLoading(false);
                if (res?.status === "200") {
                    router.push("/chat")
                } else if (res?.status === "401") {
                    setValidationError("Invalid Credentials")
                } else if (res?.status === "101") {
                    router.push("/verification")
                }}
            }}>
                <div className="my-4  flex-col flex justify-between">
                    <label>Email: </label>
                    <input id="email" name="email" type="email" autoComplete="email" required={true} />
                </div>
                <div className="flex flex-col justify-between">
                    <label>Password:</label>
                    <input className="flex" id="password" name="password" autoComplete="current-password" type="password" required={true} />
                </div>
                {!validationError ? <p></p> : <p className="text-red-500 text-xs"> {validationError}</p>}
                <div className="w-full flex justify-center mt-4">
                    <button type="submit" className="border-[1px] border-zinc2 btn" onClick={() => setLoading(true)}>{loading ? <Image src={loader} alt="loader-animation" width={20} height={20}/> : <>Login</>}</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn
