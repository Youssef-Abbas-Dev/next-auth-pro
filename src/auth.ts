import NextAuth from "next-auth";
import { prisma } from "./utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";


const { handlers, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.sub) session.user.id = token.sub;
            return session;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig
});

export { handlers, auth, signIn, signOut };