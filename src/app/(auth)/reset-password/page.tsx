import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordFrom";

const ResetPasswordPage = () => {
    return (
        <section className="w-2/5">
            <div className="bg-white shadow-md rounded-md p-5">
                <h1 className="font-bold text-3xl text-slate-700 mb-5 text-center">
                    Reset your password
                </h1>
                <ResetPasswordForm />
                <p className="p-1 mt-3">
                    <Link href="/login" className="mx-1 text-blue-700 underline">
                        Go to login
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default ResetPasswordPage