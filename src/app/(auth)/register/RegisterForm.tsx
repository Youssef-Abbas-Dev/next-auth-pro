"use client";

import { BsPersonPlus } from "react-icons/bs";
import { useState } from "react";
import { registerAction } from "@/actions/auth.action";
import { RegisterSchema } from "@/utils/validationSchmas";
import Spinner from "@/components/Spinner";
import Alert from "@/components/Alert";
import SocialProviders from "@/components/SocialProviders";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [clientError, setClientError] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverSuccess, setServerSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const user = { email, password, name };

        const validation = RegisterSchema.safeParse(user);
        if (!validation.success)
            return setClientError(validation.error.errors[0].message);

        setLoading(true);
        registerAction(user).then((result) => {
            if (result.success) {
                setClientError("");
                setServerError("");
                setName("");
                setEmail("");
                setPassword("");
                setServerSuccess(result.message);
            }

            if (!result.success) {
                setServerSuccess("");
                setServerError(result.message);
            }

            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setServerError("Something went wrong, try again");
        });
    }
    return (
        <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col mb-3">
                <label className="p-1 text-slate-500 font-bold" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />
            </div>
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
                    disabled={loading}
                />
            </div>

            {(clientError || serverError) && <Alert type="error" message={clientError || serverError} />}
            {serverSuccess && <Alert type="success" message={serverSuccess} />}

            <button disabled={loading} className="disabled:bg-gray-300 flex items-center justify-center bg-slate-800 hover:bg-slate-900 mt-4 text-white cursor-pointer rounded-lg w-full p-2 text-xl" type="submit">
                {loading ? <Spinner /> : <><BsPersonPlus className="me-1 text-2xl" /> Register</>}
            </button>
            <SocialProviders />
        </form>
    )
}

export default RegisterForm