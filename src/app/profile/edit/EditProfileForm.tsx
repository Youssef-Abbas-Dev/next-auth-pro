"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import Alert from "@/components/Alert";
import { updateProfileAction } from "@/actions/profile.action";
import { UpdateProfileSchema } from "@/utils/validationSchmas";

interface Props {
    name: string;
    userId: string;
}

const EditProfileForm = ({ name, userId }: Props) => {
    const router = useRouter();
    const [newName, setNewName] = useState(name);

    const [clientError, setClientError] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverSuccess, setServerSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = UpdateProfileSchema.safeParse({ name: newName });
        if (!validation.success)
            return setClientError(validation.error.errors[0].message);

        setLoading(true);
        updateProfileAction(validation.data, userId).then((result) => {
            if (result.success) {
                setClientError("");
                setServerError("");
                setServerSuccess(result.message);
            }

            if (!result.success) {
                setServerSuccess("");
                setServerError(result.message);
            }

            setLoading(false);
            router.push("/profile");
        }).catch(() => {
            setLoading(false);
            setServerError("Something went wrong, try again");
        });
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col mb-3">
                <label className="p-1 text-slate-500 font-bold" htmlFor="name">
                    New Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    disabled={loading}
                />
            </div>

            {(clientError || serverError) && <Alert type="error" message={clientError || serverError} />}
            {serverSuccess && <Alert type="success" message={serverSuccess} />}

            <button disabled={loading} className="disabled:bg-gray-300 flex items-center justify-center bg-slate-800 hover:bg-slate-900 mt-4 text-white cursor-pointer rounded-lg w-full p-2 text-xl" type="submit">
                {loading ? <Spinner /> : "Update"}
            </button>
        </form>
    )
}

export default EditProfileForm