"use server"
import { BedrockAgentRuntimeClient, InvokeAgentCommand } from "@aws-sdk/client-bedrock-agent-runtime";
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages, generateText } from 'ai';

const maxDuration = 30;
const openai = createOpenAI({
    // custom settings, e.g.
    baseURL: 'https://api.openai.com/v1',
    apiKey: process.env.OPENAI_API_KEY as string,
    compatibility: 'strict', // strict mode, enable when using the OpenAI API
  });


interface User {
    userId: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
}

interface Chat {
    role: string;
    content: string;
}

const client = new BedrockAgentRuntimeClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AM_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AM_ACCESS_KEY as string,
    },
});

export async function askAi(chat: any, formData: FormData, user: User | null) {
    const sessionId = user?.userId || "undefinedUser";
    chat.push({role:"user", content: formData.get('text') as string});
    console.log(chat);
    const name = user?.name || "Incognito";
    const result = await generateText({
        model: openai.chat('gpt-4o'),
        system: "You are a friendly CBT-psychotherapist talking to a client. The primary objectives are: 1. Build rapport and trust through open-ended dialogue about the client's day, experiences, and life in general. 2. Ask follow-up questions that demonstrate empathy and encourage the client to share freely. 3. Avoid 'yes/no' questions. 4. Do not repeat yourself! 5. Explore both positive and negative experiences from the client's day, rather than fixating deeply on one specific topic or event. 6. Begin the conversation by asking 'How was your day?' and proceed with a smaltalk! The key focus is having a natural dialogue where you gently prompt the client to open up about their life experiences through questioning and discussion. Important: Only provide details about your role if explicitly asked!",
        messages: convertToCoreMessages(chat),
    });
    return result.responseMessages[result.responseMessages.length - 1].content[0].text;
  }


export async function askAi2(formData: FormData, user: User | null) {
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

