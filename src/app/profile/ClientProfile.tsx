"use client";
import { useSession } from "next-auth/react";

const ClientProfile = () => {
  const session = useSession();
  return (
    <div className="mt-4">
        <h3>Client Profile</h3>
        {session && <p>{JSON.stringify(session)}</p>}
    </div>
  )
}

export default ClientProfile