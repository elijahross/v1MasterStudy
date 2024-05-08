"use client"
import Image from "next/image";
import { getSession } from "@/actions/session";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthWrapper from "@/components/AuthWrapper";

export default function Authorization() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [session, setSession] = useState({} as any);
  useEffect(() => {
    getSession().then((session) => setSession(session));
  }, [toggle]);

  function handleClick(destination: boolean) {
    if(session.user) {
      router.push("/chat")
    } else {

    }
  }
  return (
    <div className=" relative flex min-h-screen flex-col items-center justify-between w-full sm:p-10 p-4">
      <div className="flex flex-col items-center justify-center max-w-xl mb-10 m-auto">
        <h1 className="text-4xl font-bold mb-4">Authorization</h1>
      </div>
      <div className="flex flex-col items-center justify-center m-auto">
        <AuthWrapper />
      </div>
      <span className="text-xs my-10 text-center w-full">While creating an Account, you agree to participate in our Study. All the data will be anonymized and proceed with caution. You can withdraw your clearence at any time. Just reach out for our support <a href="mailto:service@ml-canvas.com" className="text-violet-800">service@ml-canvas.com</a>!</span>
    </div>
  );
}
