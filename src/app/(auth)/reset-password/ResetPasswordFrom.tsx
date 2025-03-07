"use client";

import { GrPowerReset } from "react-icons/gr";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import { ResetPasswordSchema } from "@/utils/validationSchmas";
import { resetPasswordAction } from "@/actions/password.action";

const ResetPasswordForm = () => {
    const params = useSearchParams();
    const token = params.get('token');

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [clientError, setClientError] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverSuccess, setServerSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = ResetPasswordSchema.safeParse({ newPassword });
        if (!validation.success)
            return setClientError(validation.error.errors[0].message);

        if (newPassword !== confirmPassword)
            return setClientError("Passwords do not match");

        if (!token)
            return setClientError("No token provided");

        setLoading(true);
        resetPasswordAction({ newPassword }, token).then((result) => {
            if (result.success) {
                setClientError("");
                setServerError("");
                setNewPassword("");
                setConfirmPassword("");
                setServerSuccess(result.message);
            }

            if (!result.success) setServerError(result.message);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setServerError("Something went wrong, try again");
        });
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col mb-3 relative">
                <label className="p-1 text-slate-500 font-bold" htmlFor="password">
                    New Password
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                />
                {
                    showPassword ?
                        <FaEyeSlash onClick={() => setShowPassword(prev => !prev)} className="text-2xl text-gray-500 absolute right-3 top-9 cursor-pointer" /> :
                        <FaEye onClick={() => setShowPassword(prev => !prev)} className="text-2xl text-gray-500 absolute right-3 top-9 cursor-pointer" />
                }
            </div>

            <div className="flex flex-col mb-3 relative">
                <label className="p-1 text-slate-500 font-bold" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                />
                {
                    showConfirmPassword ?
                        <FaEyeSlash onClick={() => setShowConfirmPassword(prev => !prev)} className="text-2xl text-gray-500 absolute right-3 top-9 cursor-pointer" /> :
                        <FaEye onClick={() => setShowConfirmPassword(prev => !prev)} className="text-2xl text-gray-500 absolute right-3 top-9 cursor-pointer" />
                }
            </div>

            {(clientError || serverError) && <Alert type="error" message={clientError || serverError} />}
            {serverSuccess && <Alert type="success" message={serverSuccess} />}
            <button disabled={loading} className="disabled:bg-gray-300 flex items-center justify-center bg-slate-800 hover:bg-slate-900 mt-4 text-white cursor-pointer rounded-lg w-full p-2 text-xl" type="submit">
                {loading ? <Spinner /> : <><GrPowerReset className="me-1 text-2xl" /> Reset</>}
            </button>
        </form>
    )
}

export default ResetPasswordForm