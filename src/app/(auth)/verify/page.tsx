import { verifyingEmailAction } from "@/actions/verification.action";
import { GoVerified } from "react-icons/go";
import { VscError } from "react-icons/vsc";
import Link from "next/link";

interface VerifyPageProps {
    searchParams: Promise<{ token: string }>
}

const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
    const currentSearchParams = await searchParams;
    const result = await verifyingEmailAction(currentSearchParams.token)

    return (
        <div className="text-center">
            {result.success ?
                <div className="flex items-center justify-center flex-col mb-4">
                    <GoVerified className="text-green-700 text-8xl" />
                    <h1 className="mt-2 text-green-700 text-3xl font-semibold">
                        Email Verified
                    </h1>
                    <p className="mt-3 text-green-600 text-xl">
                        your email verified
                    </p>
                </div> :
                <div className="flex items-center justify-center flex-col mb-4">
                    <VscError className="text-red-700 text-8xl" />
                    <h1 className="mt-2 text-red-700 text-3xl font-semibold">
                        Eroor
                    </h1>
                    <p className="mt-3 text-red-600 text-xl">
                        Something went wrong, try again
                    </p>
                </div>}

            <Link href="/login" className="text-blue-600 underline text-xl">
                Go to login
            </Link>
        </div>
    )
}

export default VerifyPage