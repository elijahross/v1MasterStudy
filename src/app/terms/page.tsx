import Link from "next/link"
import Image from "next/image"
import login from "../../../public/login.svg"
import timer from "../../../public/world.svg"


function TermsPage() {
    return (
        <div className="flex flex-col w-full h-full justify-center px-8 pb-10">
            <div className="w-full flex flex-row justify-between mt-10 mb-8">
                <Link href="/" className={`hover:scale-105 active:scale-100 transition-all duration-700 cursor-pointer`} >
                    <Image src={timer} alt="altss" width={30} className="h-auto" />
                </Link>
                <Link href="/authorization" className={`btn flex flex-row items-center`} >
                    <Image src={login} alt="alsst" width={30} className="h-auto" />
                    <p className="ml-4">Sign up</p></Link>
            </div>
            <h1 className="text-2xl mb-2 w-full text-center">Terms & Conditions</h1>

            <p className="text-xs mb-8 w-[70%] m-auto text-center">Please read these Terms & Conditions carefully before using our mental health chatbot platform. By accessing or using our platform, you agree to be bound by these Terms & Conditions.</p>

            <h2 className="font-bold text-xl mb-4 mt-8">Data Collection & Usage</h2>

            <p>Our platform collects and stores all user interactions in an anonymized form for research purposes for a period of 6 months. This data may be shared with our service providers, including ElevenLabs, D-ID, AWS, and Turso, solely for facilitating the platform's functionality. By using our platform, you indirectly agree to the data usage policies of these third-party service providers.</p>

            <p>We may store and read cookies on your local browser to enhance your experience. However, no personal information will be used for marketing or any other purposes unrelated to our research goals.</p>

            <h2 className="font-bold mb-4 text-xl mt-8">User Rights</h2>

            <p>You have the right to withdraw your consent to share interaction data with us at any time. To do so, please contact us at <a href="mailto:service@ml-canvas.com">service@ml-canvas.com</a>. Upon receiving your request, we will promptly delete any stored data associated with your account.</p>

            <h2 className="font-bold mb-4 text-xl mt-8">Third-Party Services</h2>

            <p>Our platform may integrate or interact with third-party services to provide certain functionalities. By using our platform, you agree to comply with the terms and policies of these third-party services.</p>

            <h2 className="font-bold mb-4 text-xl mt-8">Disclaimer</h2>

            <p>Our mental health chatbot is provided "as is" without any warranty, express or implied. We do not guarantee the accuracy, completeness, or reliability of the information or advice provided by the chatbot.</p>

            <h2 className="font-bold mb-4 text-xl mt-8">Limitation of Liability</h2>

            <p>In no event shall we be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of our platform.</p>

            <h2 className="font-bold mb-4 text-xl mt-8">Governing Law</h2>

            <p>These Terms & Conditions shall be governed by and construed in accordance with the European Data Privacy and Protection regulations.</p>

            <h2 className="font-bold mb-4 text-xl mt-8">Changes to Terms & Conditions</h2>

            <p>We reserve the right to modify or update these Terms & Conditions at any time without prior notice. Your continued use of our platform after any changes constitutes your acceptance of the new Terms & Conditions.</p>

            <p>By using our mental health chatbot platform, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.</p>
        </div>
    )
}

export default TermsPage
