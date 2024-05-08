'use server';
import { SignJWT, jwtVerify } from "jose";

interface User {
    userId: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
}

interface Session {
    payload:{
        user: {
            userId: string | null;
            role: string | null;
            name: string | null;
            email: string | null;
        } | null;
        expires: string | null;
}}


const secretKey = process.env.AUTH_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: {user: User, expires: Date}) {
    return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(key);
}


export async function decrypt(token: string | undefined = "") {
    try{
        const { payload }: Session = await jwtVerify(token, key, { algorithms: ["HS256"] });
        return payload;
    } catch (error) {console.log("Failed JWT-Decryption"); return null;}
}