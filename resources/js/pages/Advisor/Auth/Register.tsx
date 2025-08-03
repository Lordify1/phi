import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import SendRequest from "@/components/Tools/SendRequest";
import { advisorName, advisorUrl } from "@/app";
import { centerFocus, guestCheck, inputClass } from "@/components/Tools/Misc";

const inputFields = [
  { name: "name", type: "text", placeholder: "Full Name", roles: ["founder", "investor"] },
  { name: "email", type: "email", placeholder: "Email", roles: ["founder", "investor"] },
  { name: "password", type: "password", placeholder: "Password", roles: ["founder", "investor"] },
  { name: "company", type: "text", placeholder: "Company / Alias", roles: ["investor"] },
];

export default function Register({auth}) {
  const [role, setRole] = useState<"founder" | "investor" | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    platform: "advisor",
    company: "",
  });

  guestCheck(auth)

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole: "founder" | "investor") => {
    setRole(selectedRole);
    setForm((prev) => ({ ...prev, role: selectedRole }));
  };

  return (
    <>
      <Head title="Register" />
      <div className={centerFocus()}>
        <h1 className="text-3xl font-bold mb-6">Join {advisorName}🚀</h1>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => handleRoleSelect("founder")}
            className={`px-5 py-2 rounded-md border ${role === "founder" ? "bg-[#00FFD1] text-black" : "border-gray-600 text-white"}`}
          >
            I'm a Founder
          </button>
          <button
            onClick={() => handleRoleSelect("investor")}
            className={`px-5 py-2 rounded-md border ${role === "investor" ? "bg-[#00FFD1] text-black" : "border-gray-600 text-white"}`}
          >
            I'm an Investor
          </button>
        </div>

        {role && (
          <form className="w-full max-w-md space-y-4">
            {inputFields
              .filter((field) => field.roles.includes(role))
              .map((field) => {
                if (field.name === "password") {
                  return (
                    <div key={field.name} className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={inputClass("w-full")}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  );
                }
                return (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={inputClass("w-full")}
                  />
                );
              })}

            <SendRequest
              url="/register"
              method="post"
              data={form}
              className="w-full"
              redirect={true}
              onResponse={() => {}}
              text="Register"
            />
          </form>
        )}

        <p className="text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href={`${advisorUrl}/login`} className="underline text-[#00FFD1]">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
