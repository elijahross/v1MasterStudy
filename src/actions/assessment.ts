"use server"
import { createClient } from "@libsql/client";
import { cookies } from "next/headers";
import { decrypt } from "./crypt";
import { setNewConnectionsLeft } from "./connectionResstriction";

const client = createClient({
    url: process.env.EDGE_DB_URL as string,
    authToken: process.env.EDGE_DB_TOKEN as string
});


export async function setAssessmentValues(formData: FormData) {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId;
    const fd = {
        qa1: formData.get('qa1'),
        qa2: formData.get('qa2'),
        qa3: formData.get('qa3'),
        qa4: formData.get('qa4'),
        qa5: formData.get('qa5'),
        qa6: formData.get('qa6'),
        qa7: formData.get('qa7'),
        qa8: formData.get('qa8'),
        qa9: formData.get('qa9'),
        qa10: formData.get('qa10'),
        qa11: formData.get('qa11'),
        qa12: formData.get('qa12'),
        qa13: formData.get('qa13'),
        qa14: formData.get('qa14'),
        qa15: formData.get('qa15'),
        qa16: formData.get('qa16'),
        qa17: formData.get('qa17'),
        qa18: formData.get('qa18'),
        qa19: formData.get('qa19'),
        qa20: formData.get('qa20'),
        qa21: formData.get('qa21'),
        qa22: formData.get('qa22'),
        qa23: formData.get('qa23'),
        qa24: formData.get('qa24'),
        qa25: formData.get('qa25')
    }
    const data = await client.execute(`UPDATE Account SET qa1='${fd.qa1}', qa2='${fd.qa2}', qa3='${fd.qa3}', qa4='${fd.qa4}', qa5='${fd.qa5}', qa6='${fd.qa6}', qa7='${fd.qa7}', qa8='${fd.qa8}', qa9='${fd.qa9}', qa10='${fd.qa10}', qa11='${fd.qa11}', qa12='${fd.qa12}', qa13='${fd.qa13}', qa14='${fd.qa14}', qa15='${fd.qa15}', qa16='${fd.qa16}', qa17='${fd.qa17}', qa18='${fd.qa18}', qa19='${fd.qa19}', qa20='${fd.qa20}', qa21='${fd.qa21}', qa22='${fd.qa22}', qa23='${fd.qa23}', qa24='${fd.qa24}', qa25='${fd.qa25}' WHERE userId='${userId}'`
    ).then(() => setNewConnectionsLeft(0)).catch((error)=> {return {status: "500", message: "Could not connect to the database. Please try again later."}});
    return {status: "200", message: "Assessment values updated successfully."}
}


