'use server';
import { cookies } from "next/headers";
import { sendVerification } from "./sendVerification";
import { encrypt } from "./crypt";
import { createClient } from "@libsql/client";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";
import {compare, hash} from "bcrypt";

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
        // Create the session
        const user = { userId: data.rows[0]?.userId || null, role: data.rows[0]?.role || null, name: data.rows[0]?.name || null, email: data.rows[0]?.email || null } as any;
        if (data.rows[0]?.verified === 'false') {
            await sendVerification(user?.email as string, user.name as string, user.userId as string);
            return {status: "101", message: "Please verify your email to continue"};
        } else {
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        const session = await encrypt({ user, expires });
        cookies().set("session", session, { expires, httpOnly: true });
        return {status: "200", message: "Logged in successfully"};
    }
    } else {
        return {status: "401", message: "Invalid credentials!"};
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
        return {status: "401", message: "User already exists!"};
    } else {
        // Insert into the Database
        const data = await client.execute(`INSERT INTO Users (userId, role, name, email, password, date, verified) VALUES ('${userId}', '${role}', '${name}', '${email}', '${password}', '${date}', 'false');`).then(() => sendVerification(email, name, userId)).catch(e => { return {status: "500", message: "Could not connect to the database. Please try again later."}});
        const setSession = await client.execute(`INSERT INTO Session (userId, sessionsLeft) VALUES ('${userId}', 10)`).catch(e => { return {status: "500", message: "Could not set user restriction. Please try again later."}});
        return {status: "200", message: "User created successfully. Please verify your email to continue."};
    }
}

export async function verifyUser(formData: FormData) {
    "use server"
    const userId = formData.get("code")
    try {
        const data = await client.execute(`SELECT * FROM Users WHERE userId = '${userId}'`);
        if (data.rows[0]?.userId !== userId) {
            return {status: "401", message: "Invalid verification code!"};
        } else {
            const update = await client.execute(`UPDATE Users SET verified = 'true' WHERE userId = '${userId}'`);
            const user = { userId: data.rows[0]?.userId || null, role: data.rows[0]?.role || null, name: data.rows[0]?.name || null, email: data.rows[0]?.email || null } as any;
            const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
            const session = await encrypt({ user, expires });
            cookies().set("session", session, { expires, httpOnly: true });
            return {status: "200", message: "User verified successfully!"};
        }
    } catch (e: any) {return {status: "500", message: "Could not connect to the database. Please try again later."}}
}