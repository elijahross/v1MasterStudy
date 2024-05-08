import Navbar from "@/components/Navbar"


export default function ChatLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="w-full h-full ">
            <div className="flex md:flex-row-reverse flex-col-reverse transition-all">
                <div className="w-full h-full">
                    {children}
                </div>
                <Navbar />
            </div>
        </section>
    )
}