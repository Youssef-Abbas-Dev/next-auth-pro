import Link from "next/link"
import EditProfileForm from "./EditProfileForm";
import { auth } from "@/auth";

const EditProfilePage = async () => {
    const session = await auth();

    return (
        <section className="w-2/5">
            <div className="bg-white shadow-md rounded-md p-5">
                <h1 className="font-bold text-3xl text-slate-700 mb-5 text-center">
                    Update Profile
                </h1>
                {session?.user &&
                    <EditProfileForm name={session?.user.name || ""} userId={session?.user.id || ""} />}
                <p className="p-1 mt-3">
                    <Link href="/profile" className="mx-1 text-blue-700 underline">
                        Back to profile page
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default EditProfilePage