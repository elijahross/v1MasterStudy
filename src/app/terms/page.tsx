import Link from "next/link"
import Image from "next/image"
import login from "../../../public/login.svg"
import timer from "../../../public/world.svg"


function TermsPage() {
    return (
        <div className="flex flex-col w-full h-full justify-center sm:px-8 px-4 pb-10">
            <div className="w-full flex flex-row justify-between mt-10 mb-8">
                <Link href="/" className={`hover:scale-105 active:scale-100 transition-all duration-700 cursor-pointer`} >
                    <Image src={timer} alt="altss" width={30} className="h-auto" />
                </Link>
                <Link href="/authorization" className={`btn flex flex-row items-center`} >
                    <Image src={login} alt="alsst" width={30} className="h-auto" />
                    <p className="ml-4">Sign up</p></Link>
            </div><h1 className="font-bold text-2xl mb-2 w-full text-center">Terms & Conditions</h1>

<p className="text-xs mb-8 w-[70%] m-auto text-center">
    Please read these Terms & Conditions carefully before using our mental health chatbot platform. By accessing or using our platform, you agree to be bound by these Terms & Conditions.
</p>

<h2 className="font-bold text-xl mb-4 mt-8">Data Collection & Usage</h2>

<p>
    Our platform is designed to provide valuable insights in usage of mental health chatbots. To facilitate and develop this technology, we collect and store the data provided throught the participants in an anonymized form. This data collection is conducted strictly for research purposes. The anonymized data may be shared with our trusted service providers, including ElevenLabs, D-ID, AWS, and Turso, solely to ensure the optimal functionality of our platform. By utilizing our platform, you implicitly agree to the data usage policies of these third-party service providers. The legal basis for processing personal data is your voluntary, explicit electronic consent in accordance with the EU General Data Protection Regulation (Art.6 §1, GDPR).
</p>
<p className="font-bold mb-4">
    You are not obligated to provide your personal data, however, without providing it, participation in the aforementioned study is not possible.
</p>
<h2 className="font-bold mb-4 mt-8">Data Types</h2>
<p>
    The following data will be collected:
</p>
<ul className="mb-4">
    <li>UUID-code created automaticaly, which does not allow participant identification</li>
    <li>Data collected during the investigation (e.g., responses in questionnaires)</li>
    <li>Demografic data provided by participant (e.g. age, gender, country)</li>

</ul>
<p>
    The following data will be temporarily stored until the end of the data collection period only for the purpose of authorization or personalization of user expirience:
</p>
<ul>
    <li>
        The email address provided by participant.
    </li>
    <li>
        The encrypted passwords for account authorization.
    </li>
    <li>
        The participant's name will be used only for the purpose of personalizing the interaction with the Ai agent. It won't be shared with any third party or used in the research.
    </li>
</ul>
<h2 className="font-bold mb-4 mt-8">Purpose</h2>
<p>
The UUID-code is used solely for linking the collected data from various measurements or for reimbursement (recording of participant hours). The data collected during the investigation is used for the research purposes stated in the participant information.
</p>
<p>
The temporarily stored data will not be collected for the study itself, but only for the server-side authorization or personalisations of the user expirience. This data will be deleted after the end of the data collection period.
</p>
<h2 className="font-bold mb-4 mt-8">Data Access</h2>

<p>
    Persons directly involved in the project have access to all data. These persons are listed by name as "project participants" in the contact information section. Access is exclusively for the purposes of the research. The project participants are obligated to maintain confidentiality while processing the data. The data is collected in an anonymized form, meaning no personally identifiable data is recorded. The collected data cannot be linked to your person at any time. The code for linking and reimbursement cannot be associated with your person by the project participants or third parties. The data collected in the study may be made publicly available in this anonymized form. All data can be made available to the Data Protection Officer of TU Chemnitz and the competent supervisory authorities upon request for audit purposes.
</p>

<h2 className="font-bold mb-4 mt-8">Storage Duration</h2>
<p>
The data for reimbursement will be retained by the entities responsible for recording, as long as necessary to fulfill examination documentation requirements. All other data will be retained according to the periods specified by law, the regulations of professional societies, or the regulations of publication organs (e.g., journals). Currently, the retention period is generally 10 years from the conclusion of the study. The person responsible for retaining this data is:
</p>
<p>
Elijah Ross, E-Mail: elijah.ross@ml-canvas.com, Tel. +49 176 84561924
</p>
<h2 className="font-bold text-xl mb-4 mt-8">User Rights</h2>

<p>
    As a user of our platform, you possess the right to withdraw your consent for the collecting of your data at any time. Should you choose to exercise this right, please contact us at
    <a href="mailto:service@ml-canvas.com">service@ml-canvas.com</a>. Upon receiving your request, we will promptly and irrevocably delete any stored data associated with your account. This process will be conducted in accordance with our data protection protocols.
</p>

<h2 className="font-bold text-xl mb-4 mt-8">Third-Party Services</h2>

<p>
    Our platform may integrate or interact with various third-party services to offer enhanced functionalities. These services are selected to provide the best possible user experience. By participationg in this study, you agree to comply with the respective terms and policies of these third-party services. We recommend that you review the privacy policies of these services to understand how your anonymized data will be handled. Involved third-party services include, but are not limited to ElevenLabs, D-ID, AWS, and Turso.
</p>

<h2 className="font-bold text-xl mb-4 mt-8">Governing Law</h2>

<p>
    These Terms & Conditions are governed by and construed in accordance with the European Data Privacy and Protection regulations, specifically the General Data Protection Regulation (GDPR). Any disputes arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts located within the European Union.
</p>

<p className="font-bold mt-8">
    By participating in the study, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
</p>

<h2 className="font-bold text-xl mb-4 mt-8">Contact Information</h2>

<p>
    For any questions or concerns regarding these Terms & Conditions or our data processing activities, please contact the project lead:
</p>

<p className="mt-8">
    <strong>Tim Kuball</strong><br/>
    Applied Gerontopsychology and Cognition<br/>
    Technische Universität Chemnitz<br/>
    Straße der Nationen 62<br/>
    09111 Chemnitz, Germany<br/>
    Telephone: +49 371 531-38036<br/>
    Email: <a href="mailto:tim.kuball@psychologie.tu-chemnitz.de">tim.kuball@psychologie.tu-chemnitz.de</a>
</p>

<p className="mt-8">
    For further inquiries regarding data protection, you may reach out to our Data Protection Officer:
</p>

<p className="mt-8">
    <strong>Gernot Kirchner</strong><br/>
    Data Protection Officer<br/>
    Technische Universität Chemnitz<br/>
    Straße der Nationen 62<br/>
    09111 Chemnitz, Germany<br/>
    Email: <a href="mailto:datenschutzbeauftragter@tu-chemnitz.de">datenschutzbeauftragter@tu-chemnitz.de</a><br/>
    Telephone: +49 371 531-12030<br/>
    Telefax: +49 371 531-12039
</p>

<p className="mt-8">
    If you believe that your data privacy rights have been infringed, you have the right to file a complaint with the supervisory authority:
</p>

<p className="mt-8">
    <strong>Dr. Juliane Hundert</strong><br/>
    Saxon Data Protection Commissioner<br/>
    Devrientstraße 5<br/>
    01067 Dresden, Germany<br/>
    Email: <a href="mailto:saechsdsb@slt.sachsen.de">saechsdsb@slt.sachsen.de</a><br/>
    Telephone: +49 351 85471-101<br/>
    Telefax: +49 351 85471-109<br/>
    Web: <a href="https://www.saechsdsb.de">www.saechsdsb.de</a>
</p>
</div>
)}

export default TermsPage
