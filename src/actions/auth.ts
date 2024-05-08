'use server';
import { cookies } from "next/headers";
import { sendVerification } from "./sendVerification";
import { encrypt } from "./crypt";
import { createClient } from "@libsql/client";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";
import {compare, hash} from "bcrypt";


interface User {
    userId: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
}

const client = createClient({
    url: process.env.EDGE_DB_URL as string,
    authToken: process.env.EDGE_DB_TOKEN as string
});

export async function login(formData: FormData) {
    "use server"
    // Extract Data
    const checkUser = { email: formData.get("email"), password: formData.get("password") };

    //Check in the Database
    const data = await client.execute(`SELECT * FROM Users WHERE email = '${checkUser.email}'`);
    const passwordMatch = await compare(checkUser.password as string, data.rows[0]?.password as string).catch(e => { throw new Error(e.message) });
    if (passwordMatch) {
        const user = { userId: data.rows[0]?.userId || null, role: data.rows[0]?.role || null, name: data.rows[0]?.name || null, email: data.rows[0]?.email || null } as User;
        if (data.rows[0]?.verified === 'false') {
            await sendVerification(user?.email as string, user.name as string, user.userId as string).then(() => { throw new Error("User not verified!") });
        }
        // Create the session
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        const session = await encrypt({ user, expires });
        cookies().set("session", session, { expires, httpOnly: true });
    } else {
        throw new Error("Invalid Credentials");
    }
}

export async function logout() {
    "use server"
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
    revalidatePath('/', 'layout');
}

export async function signUp(formData: FormData) {
    "use server"
    // Extract Data
    const userId = uuid();
    const role = (Math.floor(Math.random() * 3) + 1) as number ;
    const date = new Date(Date.now());
    const fullname = formData.get("name");
    const name = fullname?.toString().split(" ")[0] as string;
    const email = formData.get("email") as string;
    const rawpassword = formData.get("password") as string;
    const password = await hash(rawpassword, 10);
    const verified = await client.execute(`SELECT * FROM Users WHERE email = '${email}'`);
    if (verified.rows[0]?.email === email) {
        throw new Error("User already exists!");
    } else {
        // Insert into the Database
        const data = await client.execute(`INSERT INTO Users (userId, role, name, email, password, date, verified) VALUES ('${userId}', '${role}', '${name}', '${email}', '${password}', '${date}', 'false');`).then(() => sendVerification(email, name, userId)).catch(e => { throw new Error("Could not set connect to the Database. Please try again later.") });
        const setSession = await client.execute(`INSERT INTO Sessions (userId, sessionsLeft) VALUES ('${userId}', '3')`).catch(e => { throw new Error("Could not set restriction for the user. Please try again later.") });
    }
}


export async function verifyUser(formData: FormData) {
    "use server"
    const userId = formData.get("code")
    try {
        const data = await client.execute(`SELECT * FROM Users WHERE userId = '${userId}'`);
        if (data.rows[0]?.userId !== userId) {
            throw new Error("The code is incorrect, try again!");
        } else {
            const update = await client.execute(`UPDATE Users SET verified = 'true' WHERE userId = '${userId}'`);
            const user = { userId: data.rows[0]?.userId || null, role: data.rows[0]?.role || null, name: data.rows[0]?.name || null, email: data.rows[0]?.email || null } as User;
            const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
            const session = await encrypt({ user, expires });
            cookies().set("session", session, { expires, httpOnly: true });
            return user;
        }
    } catch (e: any) { throw new Error(e) }
}