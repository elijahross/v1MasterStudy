"use server"
export async function deleteStream(streamId: string | null, sessionId: string | null) {
    if(streamId=== null || sessionId === null) return;
    try {
    const sessionResponse = await fetch(`https://api.d-id.com/talks/streams/${streamId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${process.env.DID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_id: sessionId }),
    });
    } catch (e) {console.log(e);}
    }