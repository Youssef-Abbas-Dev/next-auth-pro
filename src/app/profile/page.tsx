import { auth } from "@/auth";
import { logoutAction } from "@/actions/auth.action";

const ProfilePage = async () => {
    const session = await auth();
    
    return (
        <div>
            {session?.user &&
                <>
                    <h1 className="text-3xl font-bold mb-7">
                        Welcome {session.user.name} to your profile
                    </h1>
                    <form action={logoutAction}>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer p-2 rounded-lg" type="submit">
                            Sign out
                        </button>
                    </form>
                </>
            }
        </div>
    )
}

export default ProfilePage