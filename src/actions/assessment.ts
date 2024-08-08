"use server"
import { createClient } from "@libsql/client";
import { cookies } from "next/headers";
import { decrypt } from "./crypt";
import { setNewConnectionsLeft } from "./connectionResstriction";

const client = createClient({
    url: process.env.EDGE_DB_URL as string,
    authToken: process.env.EDGE_DB_TOKEN as string
});


export async function setAssessmentValues1(formData: FormData) {
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
        qa10: formData.get('qa10')
    }
    const data = await client.execute(`UPDATE Account SET qa1='${fd.qa1}', qa2='${fd.qa2}', qa3='${fd.qa3}', qa4='${fd.qa4}', qa5='${fd.qa5}', qa6='${fd.qa6}', qa7='${fd.qa7}', qa8='${fd.qa8}', qa9='${fd.qa9}', qa10='${fd.qa10}' WHERE userId='${userId}'`
    ).then(() => setNewConnectionsLeft(0)).catch((error)=> {return {status: "500", message: "Could not connect to the database. Please try again later."}});
    return {status: "200", message: "Assessment values updated successfully."}
}
export async function setAssessmentValues2(formData: FormData) {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId;
    const fd = {
        qa11: formData.get('qa11'),
        qa12: formData.get('qa12'),
        qa13: formData.get('qa13'),
        qa14: formData.get('qa14'),
        qa15: formData.get('qa15'),
        qa16: formData.get('qa16'),
        qa17: formData.get('qa17'),
        qa18: formData.get('qa18'),
        qa19: formData.get('qa19'),
        qa20: formData.get('qa20')
    }
    const data = await client.execute(`UPDATE Account SET qa11='${fd.qa11}', qa12='${fd.qa12}', qa13='${fd.qa13}', qa14='${fd.qa14}', qa15='${fd.qa15}', qa16='${fd.qa16}', qa17='${fd.qa17}', qa18='${fd.qa18}', qa19='${fd.qa19}', qa20='${fd.qa20}' WHERE userId='${userId}'`
    ).then(() => setNewConnectionsLeft(0)).catch((error)=> {return {status: "500", message: "Could not connect to the database. Please try again later."}});
    return {status: "200", message: "Assessment values updated successfully."}
}

export async function setAssessmentValues3(formData: FormData) {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId;
    const fd = {
        qa21: formData.get('qa21'),
        qa22: formData.get('qa22'),
        qa23: formData.get('qa23'),
        qa24: formData.get('qa24'),
        qa25: formData.get('qa25'),
        qa26: formData.get('qa26'),
        qa27: formData.get('qa27'),
        qa28: formData.get('qa28'),
        qa29: formData.get('qa29'),
        qa30: formData.get('qa30')
    }
    const data = await client.execute(`UPDATE Account SET qa21='${fd.qa21}', qa22='${fd.qa22}', qa23='${fd.qa23}', qa24='${fd.qa24}', qa25='${fd.qa25}', qa26='${fd.qa26}', qa27='${fd.qa27}', qa28='${fd.qa28}', qa29='${fd.qa29}', qa30='${fd.qa30}' WHERE userId='${userId}'`
    ).then(() => setNewConnectionsLeft(0)).catch((error)=> {return {status: "500", message: "Could not connect to the database. Please try again later."}});
    return {status: "200", message: "Assessment values updated successfully."}
}

export async function setAssessmentValues4(formData: FormData) {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId;
    const fd = {
        qa31: formData.get('qa31'),
        qa32: formData.get('qa32'),
        qa33: formData.get('qa33'),
        qa34: formData.get('qa34'),
        qa35: formData.get('qa35'),
        qa36: formData.get('qa36'),
        qa37: formData.get('qa37'),
        qa38: formData.get('qa38'),
        qa39: formData.get('qa39'),
        qa40: formData.get('qa40')
    }
    const data = await client.execute(`UPDATE Account SET qa31='${fd.qa31}', qa32='${fd.qa32}', qa33='${fd.qa33}', qa34='${fd.qa34}', qa35='${fd.qa35}', qa36='${fd.qa36}', qa37='${fd.qa37}', qa38='${fd.qa38}', qa39='${fd.qa39}', qa40='${fd.qa40}' WHERE userId='${userId}'`
    ).then(() => setNewConnectionsLeft(0)).catch((error)=> {return {status: "500", message: "Could not connect to the database. Please try again later."}});
    return {status: "200", message: "Assessment values updated successfully."}
}

export async function setAssessmentValues5(formData: FormData) {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId;
    const fd = {
        qa41: formData.get('qa41'),
        qa42: formData.get('qa42'),
        qa43: formData.get('qa43'),
        qa44: formData.get('qa44'),
        qa45: formData.get('qa45'),
        qa46: formData.get('qa46'),
        qa47: formData.get('qa47'),
        qa48: formData.get('qa48'),
        qa49: formData.get('qa49'),
        qa50: formData.get('qa50')
    }
    const data = await client.execute(`UPDATE Account SET qa41='${fd.qa41}', qa42='${fd.qa42}', qa43='${fd.qa43}', qa44='${fd.qa44}', qa45='${fd.qa45}', qa46='${fd.qa46}', qa47='${fd.qa47}', qa48='${fd.qa48}', qa49='${fd.qa49}', qa50='${fd.qa50}' WHERE userId='${userId}'`
    ).then(() => setNewConnectionsLeft(0)).catch((error)=> {return {status: "500", message: "Could not connect to the database. Please try again later."}});
    return {status: "200", message: "Assessment values updated successfully."}
}


export async function setAssessmentValues6(formData: FormData) {
    "use server"
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    const userId = session?.user?.userId;
    const fd = {
        qa51: formData.get('qa51'),
        qa52: formData.get('qa52'),
        qa53: formData.get('qa53'),
        qa54: formData.get('qa54'),
        qa55: formData.get('qa55')
    }
    const data = await client.execute(`UPDATE Account SET qa51='${fd.qa51}', qa52='${fd.qa52}', qa53='${fd.qa53}', qa54='${fd.qa54}', qa55='${fd.qa55}' WHERE userId='${userId}'`
    ).then(() => setNewConnectionsLeft(0)).catch((error)=> {return {status: "500", message: "Could not connect to the database. Please try again later."}});
    return {status: "200", message: "Assessment values updated successfully."}
}
