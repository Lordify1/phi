import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import SendRequest from "@/components/Tools/SendRequest";
import { IoMailSharp, IoMailUnread, IoMailUnreadOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function VerifyEmail({ user }: any) {
  const [message, setMessage] = useState<string | null>(null);
//   console.log(user)
    toast.success('Verification Email Sent')
    if (!user) {
        window.history.back();
        toast.error('Not Logged In')
        return null;
    }

  return (
    <>
      <Head title="Verify Email" />
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#0f0f0f] text-white px-4">
        <div className="max-w-lg w-full bg-[#1c1c1c] p-8 rounded-xl shadow-lg text-center space-y-6">
          <div className="flex justify-center text-center">
            <IoMailUnreadOutline className="text-6xl font-bold text-[#00FFD1]" />
          </div>
          <h1 className="text-3xl font-bold text-[#00FFD1]">Email Verification</h1>

          {user?.email_verified_at ? (
            <div>
              <p className="text-green-400">✅ Your email is already verified.</p>
              <a
                href="/dashboard"
                className="mt-4 inline-block bg-[#00FFD1] text-black font-semibold px-5 py-2 rounded hover:bg-[#00ccaa]"
              >
                Go to Dashboard
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                A verification link has been sent to your email:
                <strong className="block mt-1">{user?.email}</strong>
              </p>

              <p className="text-sm text-gray-400">
                Didn’t receive the email? Click below to resend.
              </p>

              <SendRequest
                url="/email/verification-notification"
                method="post"
                text="Resend Email"
                onResponse={(res: any) =>
                  setMessage("Verification link sent again! Check your inbox ✨")
                }
              />

              {message && <p className="text-sm text-green-400">{message}</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
