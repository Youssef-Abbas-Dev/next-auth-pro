import Link from "next/link";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <section className="w-2/5">
            <div className="bg-white shadow-md rounded-md p-5">
                <h1 className="font-bold text-3xl text-slate-700 mb-5 text-center">
                    Sign in to your account
                </h1>
                <LoginForm />
                <p className="p-1 mt-3">
                    Do not have an account?
                    <Link href="/register" className="mx-1 text-blue-700 underline">
                        Register
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default LoginPage