'use server';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "./crypt";
import { revalidatePath } from "next/cache";


export async function getSession() {
    "use server"
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function deleteSession(request: NextRequest) {
    "use server"
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session) as any;
    parsed.expires = new Date(Date.now());
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    revalidatePath('/', 'layout');
    return res;
}