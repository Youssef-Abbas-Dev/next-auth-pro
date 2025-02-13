import NextAuth, { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & { role: Role }
    }
}