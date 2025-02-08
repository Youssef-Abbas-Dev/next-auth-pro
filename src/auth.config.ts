import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./utils/prisma";
import { LoginSchema } from "./utils/validationSchmas";
import * as bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            async authorize(data) {
                const validation = LoginSchema.safeParse(data);
                if (validation.success) {
                    const { email, password } = validation.data;
                    const user = await prisma.user.findUnique({ where: { email } });
                    if (!user || !user.password) return null;

                    const isPasswordMatch = await bcrypt.compare(password, user.password);
                    if (isPasswordMatch) return user;
                }

                return null;
            }
        })
    ]
} satisfies NextAuthConfig