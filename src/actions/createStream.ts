"use server"
export async function createStream() {
 try {
    const sessionResponse = await fetch(`https://api.d-id.com/talks/streams`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${process.env.DID_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Aria_f/v1_image.png'
            }
        ),
    });
    if(!sessionResponse.ok) {throw new Error('Error during session creation')}
    const { id: newStreamId, offer, ice_servers: iceServers, session_id: newSessionId } = await sessionResponse.json();
    const streamId = newStreamId;
    const sessionId = newSessionId;
    return { streamId, sessionId, offer, iceServers } as { streamId: string, sessionId: string, offer: RTCSessionDescriptionInit, iceServers: RTCIceServer[] } | undefined;
} catch (e) {
    throw new Error('Error during session creation');
}
}
