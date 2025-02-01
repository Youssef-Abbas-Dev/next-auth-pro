"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { useState } from "react";
import { LoginSchema } from "@/utils/validationSchmas";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { loginAction } from "@/actions/auth.action";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [clientError, setClientError] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverSuccess, setServerSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = LoginSchema.safeParse({ email, password });
        if (!validation.success)
            return setClientError(validation.error.errors[0].message);

        loginAction({ email, password }).then((result) => {
            if (result?.error) setServerError(result.error);
            if (result?.success) setServerSuccess(result.success);
        });

        setEmail("");
        setPassword("");
        setClientError("");
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col mb-3">
                <label className="p-1 text-slate-500 font-bold" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-3">
                <label className="p-1 text-slate-500 font-bold" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {(clientError || serverError) && <Alert type="error" message={clientError || serverError} />}
            {serverSuccess && <Alert type="success" message={serverSuccess} />}
            
            <button disabled={loading} className="disabled:bg-gray-300 flex items-center justify-center bg-slate-800 hover:bg-slate-900 mt-4 text-white cursor-pointer rounded-lg w-full p-2 text-xl" type="submit">
                {loading ? <Spinner /> : <><IoMdLogIn className="me-1 text-2xl" /> Login</>}
            </button>
            <div className="flex items-center justify-center gap-6 mt-6">
                <div className="border bg-blue-100 hover:bg-blue-200 rounded px-4 py-2 cursor-pointer w-1/2 flex justify-center items-center">
                    <FcGoogle className="text-4xl" />
                </div>
                <div className="border bg-slate-100 hover:bg-slate-200 rounded px-4 py-2 cursor-pointer w-1/2 flex justify-center items-center">
                    <FaGithub className="text-4xl" />
                </div>
            </div>
        </form>
    )
}

export default LoginForm