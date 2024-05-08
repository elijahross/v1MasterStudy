"use server"
export async function onIceCandidate(candidate: string|null, sdpMid:string |null, sdpMLineIndex:number |null, streamId: string | null, sessionId: string | null) {
    try{
        const response = await fetch(`https://api.d-id.com/talks/streams/${streamId}/ice`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${process.env.DID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                candidate,
                sdpMid,
                sdpMLineIndex,
                session_id: `${sessionId}`,
            })
        })
        return response.json();
    } catch (e) {
        console.log(e);}
    }