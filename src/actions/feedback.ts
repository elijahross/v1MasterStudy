'use server';
import { createClient } from "@libsql/client";

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

export async function postFeedback(formData: FormData) {
    "use server"
    const userId = formData.get("userId");
    const reply = formData.get("reply");
    const stars = formData.get("stars");
    const verify = await client.execute(`SELECT * FROM Feedback WHERE userId = '${userId}'`);
    if (verify.rows[0]?.userId === userId) {
    const update = await client.execute(`UPDATE Feedback SET stars = ${stars}, reply = '${reply}' WHERE userId = '${userId}'`);
    } else {
    const data = await client.execute(`INSERT INTO Feedback (userId, stars, reply) VALUES ('${userId}', '${stars}', '${reply}')`);
    }
}

export async function updateInformation(formData: FormData) {
    "use server"
    const age = formData.get("age");
    const gender = formData.get("gender");
    const country = formData.get("country");
    const userId = formData.get("userId");
    try{
    const verify = await client.execute(`SELECT * FROM Account WHERE userId = '${userId}'`);
    if (verify.rows[0]?.userId === userId) {
    const update = await client.execute(`UPDATE Account SET sex = ${gender}, age = '${age}', country = ${country} WHERE userId = '${userId}'`);
    } else {
    const data = await client.execute(`INSERT INTO Account (sex, age, country, userId) VALUES ('${gender}', '${age}', '${country}','${userId}')`);
    }} catch (e) {throw new Error("Could not reach the database, try again later")}
}