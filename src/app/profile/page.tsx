import { auth } from "@/auth";
import { logoutAction } from "@/actions/auth.action";
import ToggleTwoStep from "./ToggleTwoStep";
import ClientProfile from "./ClientProfile";
import { SessionProvider } from "next-auth/react";

const ProfilePage = async () => {
    const session = await auth();

    return (
        <div className="flex items-center justify-center flex-col">
            {session?.user &&
                <>
                    <p className="mb-5 text-center px-9">{JSON.stringify(session)}</p>
                    <h1 className="text-3xl font-bold mb-7">
                        Welcome {session.user.name} to your profile
                    </h1>
                    <form action={logoutAction}>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer p-2 rounded-lg" type="submit">
                            Sign out
                        </button>
                    </form>
                    {session.user.id && <ToggleTwoStep userId={session.user.id} isTwoStepEnabled={session.user.isTwoStepEnabled} />}
                </>
            }
            <SessionProvider session={session}>
                <ClientProfile />
            </SessionProvider>
        </div>
    )
}

export default ProfilePage