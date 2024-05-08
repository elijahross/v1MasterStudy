"use client"
import { useRouter } from "next/navigation";
import { getSession } from "@/actions/session";
import { verifyUser } from "@/actions/auth";
import { updateInformation } from "@/actions/feedback";
import { useState, useEffect } from "react";
import Image from "next/image";
import loader from "../../../public/loader.svg"
import mail from "../../../public/email.svg"
import newuser from "../../../public/createuser.svg"


function VerificationPage() {
    const [err, setErr] = useState("" as string);
    const [loading, setLoading] = useState(false);
    const [uid, setUid] = useState("" as any);
    const [tab, setTab] = useState(true);
    const router = useRouter();
    const genderOptions = [
        { value: '0', label: 'Female' },
        { value: '1', label: 'Male' },
        { value: '2', label: 'Non-Binary' }
    ]

    useEffect(() => {
        const sessionFunction = async () => { await getSession().then((result: any) => { result?.userId ? router.push("/chat") : null }).catch((error: any) => setErr(error.message)) };
        sessionFunction();
    }, [])

    async function handleSubmitCode(formData: FormData) {
        try {
            const check = formData.get("code")
            const user = await verifyUser(formData) as any;
            setLoading(false)
            if (check === user.userId) {
                setUid(check);
                setTab(false);
            }

        } catch (error: any) { setLoading(false); setErr(error.message) }
    }

    async function handleSubmitData(formData: FormData) {
        try {
            await updateInformation(formData).then(() => router.push("/chat"));
            setLoading(false)
        } catch (error: any) { setLoading(false); setErr(error.message) }
    }


    return (
        <div className="w-full h-full">
            {tab ?
                <div className="flex flex-col w-full h-full justify-center px-8 pt-20">
                    <h1 className="text-2xl w-full font-bold text-center mb-20">Now we have a secret to share</h1>
                    <div className="p-4 border-2 rounded-xl flex flex-col max-w-xl m-auto">
                        <div className="flex flex-row items-center">
                            <Image src={mail} alt="email_icon" width={20} height={20} className="mr-4"/>
                            <span> Please, take a look in your inbox and enter provided secret code below: </span>
                        </div>
                        <form action={async (formData) => {await handleSubmitCode(formData).catch((error) => { setLoading(false); setErr(error.message) })}} className="w-full flex flex-col items-center" onSubmit={() => setLoading(true)}>
                            <input type="text" name="code" id="code" placeholder="Enter code"  className="rounded-md w-[80%] my-4"/>
                            <p className="text-xs text-red-400 w-full text-center">{err}</p>
                            <button type="submit" className="btn border-2">{loading ? <Image src={loader} alt="spinner" width={20} height={20} /> : "Verify"}</button>
                        </form>
                    </div>
                </div>

                :

                <div className="flex flex-col w-full h-full justify-center px-8 pt-20">
                    <h2 className="text-2xl w-full font-bold text-center mb-20">You are almost there!</h2>
                    <div className="p-4 border-2 rounded-xl flex flex-col max-w-xl m-auto">
                        <span className="mb-4">Tell us few details about you:</span>
                        <div className="flex flex-row items-center justify-start">
                            <Image src={newuser} alt="avatar_icon" width={200} height={200} className="mr-8 sm:block hidden"/>
                            <form className="flex flex-col w-full" action={async (formData) => {await handleSubmitData(formData).catch((error) => { setLoading(false); setErr(error.message) })}} onSubmit={() => setLoading(true)}>
                                <label>Age:</label>
                                <input className="mb-4 rounded-md" type="number" name="age" id="age" min="18" max="75" required={true} />
                                <label>Gender:</label>
                                <select className="mb-4 rounded-md" name="gender" id="gender" required={true}>
                                    <option value={1}>Female</option>
                                    <option value={2}>Male</option>
                                    <option value={3}>Non-Binary</option>
                                </select>
                                <label>Country:</label>
                                <select className="mb-8 rounded-md" name="country" id="country" required={true}>
                                    <option value="United States">United States</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Moldova">Moldova</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">Russian Federation</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="Span">Spain</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Serbia">Serbia</option>
                                </select>
                                <input type="text" name="userId" id="userId" value={uid} hidden={true} />
                                <p className="text-xs text-red-400"></p>
                                <button type="submit" className="btn border-2 items-center flex justify-center">{loading ? <Image src={loader} alt="spinner" width={20} height={20} className="m-auto self-center"/> : "Update"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default VerificationPage
