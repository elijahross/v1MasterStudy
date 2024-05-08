"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { changeOptions, getOptions } from "@/actions/options";
import { useRouter } from "next/navigation";
import loader from "../../../../public/loader.svg"

interface Options {
    followup: boolean | null,
    information: boolean | null,
    history: boolean | null,
    contacts: boolean | null
}

function SettingsPage() {
    const router = useRouter();
    const [contact, setContact] = useState(true);
    const [shareData, setShareData] = useState(true);
    const [shareHistory, setShareHistory] = useState(true);
    const [shareContact, setShareContact] = useState(true);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState() as any;

    useEffect(() => {
        const getSettings = async () => {
            const res = await getOptions().catch((error) => setErr(error.message));
                setContact(res.followup === "true");
                setShareData(res.information === "true");
                setShareHistory(res.history === "true");
                setShareContact(res.contacts === "true");
        };
        getSettings();
    }, [])

    async function newOptions() {
        const options = {
            followup: `${contact}`,
            information: `${shareData}`,
            history: `${shareHistory}`,
            contacts: `${contact}`
        }
        const res = await changeOptions(options).catch((error) => setErr(error.message));
        setLoading(false);
        if (res?.status === "500") {
            setErr("Sorry, we couldn't connect to the database. Please try again later.");
        } else if (res?.status === "401") {
            setErr("We couldn't find your session. Please log in again.");
        }

    }
    return (
        <div className="sm:py-10 py-20 flex flex-col w-full h-full justify-center md:px-10 px-2">
            <h1 className="text-2xl mb-4 w-full text-center">We respect your privacy</h1>
            <h2 className="text-sm w-full text-center">Choose options that fit your needs</h2>
            <div className="flex flex-col sm:mt-20 mt-10 w-fit m-auto">
                <div id="information share" className="flex flex-col">
                    <div id="followup" className="mb-4 flex flex-row">
                        <label className="toggle ml-[4px]" >
                            <input type="checkbox" name="followup" className={`toggle-checkbox`} checked={contact} onChange={() => setContact(prev => !prev)} />
                            <div className='toggle-switch' />
                        </label>
                        <div className={`${contact ? "" : "text-gray-400"} text-xs self-center ml-4`}>
                            I allow ml-canvas to contact me for follow-up studies
                        </div>
                    </div>
                    <div id="information" className="mb-8 flex flex-row">
                        <label className="toggle ml-[4px]" >
                            <input type="checkbox" name="information" className={`toggle-checkbox`} checked={shareData} onChange={() => setShareData(prev => !prev)} />
                            <div className='toggle-switch' />
                        </label>
                        <div className={`${shareData ? "" : "text-gray-400"} text-xs self-center ml-4`}>
                            I allow ml-canvas to use my data for research purposes
                        </div>
                    </div>
                    <div className={`${shareData ? "opacity-100" : "pointer-events-none opacity-50"}`}>
                        <h3 className="font-bold mb-4 text-sm">Which data would you like to share?</h3>
                        <div id="history" className="mb-4 flex flex-row">
                            <label className="toggle ml-[4px]" >
                                <input type="checkbox" name="history" className={`toggle-checkbox`} checked={shareHistory} onChange={() => setShareHistory(prev => !prev)} />
                                <div className='toggle-switch' />
                            </label>
                            <div className={`${shareHistory ? "" : "text-gray-400"} text-xs self-center ml-4`}>
                                Chat history
                            </div>
                        </div>
                        <div id="contacts" className="mb-4 flex flex-row">
                            <label className="toggle ml-[4px]" >
                                <input type="checkbox" name="contacts" className={`toggle-checkbox`} checked={shareContact} onChange={() => setShareContact(prev => !prev)} />
                                <div className='toggle-switch' />
                            </label>
                            <div className={`${shareContact ? "" : "text-gray-400"} text-xs self-center ml-4`}>
                                Contact information
                            </div>
                        </div>
                    </div>
                </div>
                <div id="castomization" className="pointer-events-none opacity-50 mt-8">
                    <p className="text-xs">*during this study unavailable</p>
                    <h3 className="mb-4 border-b-2 font-bold">Avatar Settings:</h3>
                    <div className="flex md:flex-row flex-col items-center text-xs">
                        <label className="mr-2">Language:</label>
                        <div id="chose the language" className="sm:mr-8 mr-0 scale-90 mb-4">
                            <select name="language" id="language" className="border-2 border-gray-200 rounded-2xl p-2">
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="es">Spanish</option>
                            </select>
                        </div>
                        <label className="mr-2">Voice:</label>
                        <div id="chose voice" className="sm:mr-8 mr-0 scale-90">
                            <select name="language" id="language" className="border-2 border-gray-200 rounded-2xl p-2 mb-4">
                                <option value="en">Female</option>
                                <option value="fr">Male</option>
                                <option value="de">Child</option>
                            </select>
                        </div>
                        <label className="mr-2">Foto:</label>
                        <div id="upload the foto" className="sm:mr-8 mr-0 scale-90 mb-4">
                            <input type="file" className="p-2 rounded-xl"></input>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-10">
                    <p className="text-xs text-red-400 mb-2">{err}</p>
                    <button className="btn border-2 w-fit m-auto" onClick={() => { setLoading(true); newOptions() }} >{loading ? <Image src={loader} alt="spinner" width={20} height={20} className="self-center" /> : "Save Changes"}</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
