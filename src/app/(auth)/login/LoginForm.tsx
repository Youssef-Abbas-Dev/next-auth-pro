"use client";

import { IoMdLogIn } from "react-icons/io";
import { useState } from "react";
import { LoginSchema } from "@/utils/validationSchmas";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { loginAction } from "@/actions/auth.action";
import SocialProviders from "@/components/SocialProviders";
import Link from "next/link";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [clientError, setClientError] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverSuccess, setServerSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [showTwoStep, setShowTwoStep] = useState(false);
    const [code, setCode] = useState("");

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = LoginSchema.safeParse({ email, password });
        if (!validation.success)
            return setClientError(validation.error.errors[0].message);

        setLoading(true);
        loginAction({ email, password, code }).then((result) => {
            if (result.success) {
                setClientError("");
                setServerError("");
                setServerSuccess(result.message);
            }

            if (!result.success) setServerError(result.message);
            if (result.twoStep) setShowTwoStep(true);

            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setServerError("Something went wrong, try again");
        });
    }

    return (
        <form onSubmit={formSubmitHandler}>
            {showTwoStep ? (
                <>
                    <div className="flex flex-col mb-3">
                        <label className="p-1 text-slate-500 font-bold" htmlFor="code">
                            Two Factor Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            disabled={loading}
                        />
                    </div >
                </>
            ) : (
                <>
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
                            disabled={loading}
                        />
                    </div >
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
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-3">
                        <Link className="px-1 underline text-blue-800" href="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>
                </>
            )}

            {(clientError || serverError) && <Alert type="error" message={clientError || serverError} />}
            {serverSuccess && <Alert type="success" message={serverSuccess} />}
            <button disabled={loading} className="disabled:bg-gray-300 flex items-center justify-center bg-slate-800 hover:bg-slate-900 mt-4 text-white cursor-pointer rounded-lg w-full p-2 text-xl" type="submit">
                {loading ? <Spinner /> : <><IoMdLogIn className="me-1 text-2xl" /> {showTwoStep ? "Confirm the code" : "Login"}</>}
            </button>
            <SocialProviders />
        </form >
    )
}

export default LoginForm