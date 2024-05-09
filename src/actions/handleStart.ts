"use server"

export async function handleStart(results: string | undefined, streamId: string, sessionId: string) {
    if (results === undefined || results === "" || results === null) return;
        try {
            const playResponse = await fetch(`https://api.d-id.com/talks/streams/${streamId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${process.env.DID_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        session_id: `${sessionId}`,
                        script: {
                            type: 'text',
                            subtitles: 'false',
                            provider: {
                                type: 'elevenlabs',
                                voice_id: 'EXAVITQu4vr4xnSDxMaL',
                                model_id: 'eleven_multilingual_v2'
                            },
                            ssml: 'false',
                            input: `${results}`
                        },
                        config: {
                            fluent: true,
                            pad_audio: '0.5',
                            auto_match: true,
                            sharpen: true,
                            result_format: 'mp4'
                        },
                        audio_optimization: '2'
                    }
                ),
            });
            if (!playResponse.ok) { throw new Error('Error during play request') }
        } catch (e: any) {
            console.log(e);
        }
}