"use client"
import Link from "next/link"


function Footer() {
    return (
        <div className="w-full bottom-0 flex h-fit">
            <span className="text-xs w-full text-center">Copyright © 2024 All rights reserved. For additional information visit <Link href="/imprint" className="text-violet-800 cursor-pointer">Imprint</Link> </span>
        </div>
    )
}

export default Footer
