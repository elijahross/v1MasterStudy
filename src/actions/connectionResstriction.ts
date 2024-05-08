"use server"
import { createClient } from "@libsql/client";
import { cookies } from "next/headers";
import { decrypt } from "./crypt";

const client = createClient({
    url: process.env.EDGE_DB_URL as string,
    authToken: process.env.EDGE_DB_TOKEN as string
});

export async function getConnectionsLeft() {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId;
    try {
        const data = await client.execute(`SELECT * FROM Session WHERE userId = '${userId}'`)
        if (data.rows[0]?.sessionsLeft) {
            const restrict = data.rows[0]?.sessionsLeft as any;
            return restrict as number;
        } else return 0;
    } catch (e: any) { throw new Error("Sorry, we couldn't connect to the database. Please try again later.") }
}

export async function setNewConnectionsLeft(newRestrict: number) {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId;
    try {
        await client.execute(`UPDATE Session SET sessionsLeft = '${newRestrict}' WHERE userId = '${userId}'`);
    } catch (e: any) { throw new Error("Sorry, we couldn't connect to the database. Please try again later.") }

}
