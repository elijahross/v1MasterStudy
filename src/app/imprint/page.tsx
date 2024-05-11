import Link from "next/link"
import Image from "next/image"
import login from "../../../public/login.svg"
import timer from "../../../public/world.svg"

function ImprintPage() {
    return (
        <div className="flex flex-col w-full h-full justify-center sm:px-8 px-4">
            <div className="w-full flex flex-row justify-between mt-10 mb-20">
                <Link href="/" className={`hover:scale-105 active:scale-100 transition-all duration-700 cursor-pointer`} >
                    <Image src={timer} alt="altss" width={30} className="h-auto" />
                </Link>
                <Link href="/authorization" className={`btn flex flex-row items-center`} >
                    <Image src={login} alt="alsst" width={30} className="h-auto" />
                    <p className="ml-4">Sign up</p></Link>
            </div>
            <h1 className="text-2xl mb-20 w-full text-center">Imprint</h1>
            <p className="font-bold text-xl mb-10">Information according to european law § 5 TMG</p>
            <p className="font-bold mb-4">Owner:</p>
            <p className="mb-2">Elijah Ross</p>
            <p className="mb-8">Pestitzer-Weg 2, 01217 Dresden, Germany</p>
            <p className="font-bold mb-4">Contact:</p>
            <p className="mb-2">Phone: +4917684561924</p>
            <p className="mb-8">Email: service@ml-canvas.com</p>
        </div>
    )
}

export default ImprintPage
