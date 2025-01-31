"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

const LoginForm = () => {
    return (
        <form>
            <div className="flex flex-col mb-3">
                <label className="p-1 text-slate-500 font-bold" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
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
                />
            </div>
            <button className="flex items-center justify-center bg-slate-800 hover:bg-slate-900 mt-4 text-white cursor-pointer rounded-lg w-full p-2 text-xl" type="submit">
                <IoMdLogIn className="me-1 text-2xl" /> Login
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