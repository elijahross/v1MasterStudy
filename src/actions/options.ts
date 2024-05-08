'use server';
import { cookies } from "next/headers";
import { decrypt } from "./crypt";
import { createClient } from "@libsql/client";

interface Options {
    followup: boolean |null,
    information: boolean |null,
    history: boolean |null,
    contacts: boolean |null
}

const client = createClient({
    url: process.env.EDGE_DB_URL as string,
    authToken: process.env.EDGE_DB_TOKEN as string
});

export async function changeOptions(options: any) {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId || null
    if(userId === null) throw new Error("We couldn't find authorizetion signature. Please log out and log in again!")
    try {
        const data = await client.execute(`SELECT * FROM Options WHERE userId = '${userId}'`);
        if (data.rows[0]?.userId === undefined) {
        await client.execute(`INSERT INTO Options (userId, followup, information, history, contacts) VALUES ('${userId}', '${options.followup}', '${options.information}', '${options.history}', '${options.contacts}')`);
        } else {
        await client.execute(`UPDATE Options SET followup = '${options.followup}', information = '${options.information}', history = '${options.history}', contacts = '${options.contacts}' WHERE userId = '${userId}'`);}
    } catch (e: any) {throw new Error(e)}
}

export async function getOptions() {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId;
    try {
    const data = await client.execute(`SELECT * FROM Options WHERE userId = '${userId}'`);
        const options = data.rows[0] as any;
        return {
            followup: `${options?.followup ? options.followup : "true"}`,
            information: `${options?.information ? options.information : "true"}`,
            history: `${options?.history ? options.history : "true"}`,
            contacts: `${options?.contacts ? options.contacts : "true"}`,
        };
    } catch (e: any) {throw new Error(e)}
}
