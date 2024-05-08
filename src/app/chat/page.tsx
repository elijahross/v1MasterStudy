import { getSession } from "@/actions/session"
import { redirect } from 'next/navigation'
import { getConnectionsLeft, setNewConnectionsLeft } from "@/actions/connectionResstriction";
import dynamic from "next/dynamic";
import StreamFallback from "@/components/StreamFallback";
import PlainChat from "@/components/PlainChat";
import FunChat from "@/components/FunChat";

const DynamicStream = dynamic(() => import('@/components/StreamWhrapper'),{
    loading: () => <StreamFallback/>, ssr: false});

async function ChatPage() {
    const restrict = await getConnectionsLeft();
    const session = await getSession();
    if (!session) {
        return redirect('/');
    } else if (restrict < 1) {
        return (
            <div className="md:px-20 px-0">
                <FunChat />
            </div>
        )
    } else if(session?.user?.role === '3') {
        await setNewConnectionsLeft(restrict - 1).catch((err) => console.log(err));
    return (
        <div className="md:px-20 px-0">
            <DynamicStream />
        </div>
    )
} else if(session?.user?.role === '2') {
    await setNewConnectionsLeft(restrict - 1).catch((err) => console.log(err));
    return (
        <div className="md:px-20 px-0">
            <StreamFallback />
        </div>
    )
} else {
    await setNewConnectionsLeft(restrict - 1).catch((err) => console.log(err));
    return (
        <div className="md:px-20 px-0">
            <PlainChat />
        </div>
    )
}}

export default ChatPage
