"use server"

export async function sendVerification(email: string, name: string, userId: string) {
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API}`,
        },
        body: JSON.stringify({
            from: "service@ml-canvas.com",
            to: `${email}`,
            subject: "Verification",
            html: `<h1>Verification</h1><br/>
            <p>Hello ${name}, your perosnal Code is</p> <br/>
            <p style="font-weight:bold;">${userId}</p>
            <br/> <p>plese go back to the site  in order to verify your email</p>
            <br/>
            <br/><p style="font-weight:bold;">Attention! Students of TU Chemnitz:</p>
            <p>For the crediting of experiment participant hours (<em>Versuchspersonenstunden</em>), please provide this code to Tim Kubal:</p><br/>
            <ul>
                <li><strong>When:</strong> Thursdays from 1:30 PM to 2:30 PM</li>
                <li><strong>Where:</strong> Wilhelm-Raabe-Straße 43 | Room 114</li>
            </ul>
            <br/>
            <p>If you did not initiate this request, please ignore this email.</p>`
        }),
    });
    if (!response.ok) {
        throw new Error('Error during verification email request');
    }
}