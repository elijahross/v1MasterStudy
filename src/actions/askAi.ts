"use server"
import { BedrockAgentRuntimeClient, InvokeAgentCommand } from "@aws-sdk/client-bedrock-agent-runtime";
interface User {
    userId: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
}

const client = new BedrockAgentRuntimeClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AM_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AM_ACCESS_KEY as string,
    },
});

export async function askAi(formData: FormData, user: User | null) {
    const text = formData.get('text') as string;
    const agentId = "QKWKWUXKN1";
    const agentAliasId = "8Q8TIKLYNQ";
    const sessionId = user?.userId || "undefinedUser";

    const command = new InvokeAgentCommand({
        agentId,
        agentAliasId,
        sessionId,
        inputText: text,
        sessionState: {
            sessionAttributes: {
                "name": user?.name || ""
            },
        },
    });

    try {
        let completion = "";
        const response = await client.send(command);

        if (response.completion === undefined) {
            throw new Error("Completion is undefined");
        }

        for await (let chunkEvent of response.completion) {
            const chunk = chunkEvent.chunk;
            const decodedResponse = new TextDecoder("utf-8").decode(chunk?.bytes);
            completion += decodedResponse;
        }
        return completion;
    } catch (err) {
        return "Connection with Ai-Server was compromised. Try again later, using secure line."
    }
};

