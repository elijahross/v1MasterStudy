"use client"
import { signUp } from '@/actions/auth';
import { useRouter } from 'next/navigation'
import { useState} from "react";
import Image from 'next/image';
import loader from "../../public/loader.svg";
import Link from 'next/link';

function SignUp() {
    const router = useRouter();
    const [validationError, setValidationError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="items-center flex-center px-8 pt-4 w-full max-w-md">
            <form action={async (formData) => {
                const res = await signUp(formData).catch((err) => setValidationError(err.message));
                setLoading(false)
                if (res?.status === "200") {
                    router.push("/verification")
                } else if (res?.status === "401") {
                    setValidationError(res.message)
                } else if (res?.status === "500") {
                    setValidationError(res.message)
            }}}>
                <div className="flex flex-col justify-between">
                    <label >Name:</label>
                    <input id="name" name="name" required = {true}/>
                </div>
                <div className="my-4  flex-col flex justify-between">
                    <label>Email:</label>
                    <input id="email" name="email" type="email" autoComplete="email" required = {true}/>
                </div>
                <div className="flex flex-col justify-between">
                    <label>Password:</label>
                    <input className="flex" id="password" name="password" autoComplete="new-password" type="password" required = {true} />
                </div>
                <p className="text-red-500">{validationError}</p>
                <div className="flex flex-row justify-between my-2">
                    <input type="checkbox" id="terms" name="terms_of_use" required={true}/>
                    <label className='text-xs ml-2'>I agree with current <Link href="/terms" className='text-violet-800'>Term & Conditions</Link></label>
                </div>
                <div className="w-full flex justify-center mt-6">
                    <button type="submit" className="border-2 btn" onClick={() => setLoading(true)}> {loading ? <Image src={loader} alt="loader-animatoin" width={20} height={20} /> : "Sign Up" } </button>
                </div>

            </form>
        </div>
    )
}

export default SignUp
