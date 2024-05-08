"use server"
export async function createSdpResponse(streamId:string, sessionId:string, sessionClientAnswer:RTCSessionDescriptionInit) {
    try{
    const resp = await fetch(`https://api.d-id.com/talks/streams/${streamId}/sdp`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${process.env.DID_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {   answer: sessionClientAnswer,
                session_id: `${sessionId}`
            }
        ),
    });
    const response = await resp.json();
    return response;
} catch (e) {
        throw new Error('Error during sdp response creation');}
}

