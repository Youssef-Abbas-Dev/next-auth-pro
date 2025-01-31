import Link from "next/link";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
    return (
        <section className="w-2/5">
            <div className="bg-white shadow-md rounded-md p-5">
                <h1 className="font-bold text-3xl text-slate-700 mb-5 text-center">
                    Create new account
                </h1>
                <RegisterForm />
                <p className="p-1 mt-3">
                    Already have an account?
                    <Link href="/login" className="mx-1 text-blue-700 underline">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default RegisterPage