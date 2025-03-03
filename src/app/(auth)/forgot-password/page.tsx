import ForgotPasswordForm from "./ForgotPasswordForm"

const ForgotPasswordPage = () => {
    return (
        <section className="w-2/5">
            <div className="bg-white shadow-md rounded-md p-5">
                <h1 className="font-bold text-3xl text-slate-700 mb-5 text-center">
                    Forgot Password
                </h1>
                <ForgotPasswordForm />
            </div>
        </section>
    )
}

export default ForgotPasswordPage