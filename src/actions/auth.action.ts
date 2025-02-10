"use server";
import { LoginSchema, RegisterSchema } from "@/utils/validationSchmas";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import * as bcrypt from 'bcryptjs';
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

// Login Action
export const loginAction = async (data: z.infer<typeof LoginSchema>) => {
    const validation = LoginSchema.safeParse(data);
    if (!validation.success)
        return { success: false, message: "Invalid credentials" };

    const { email, password } = validation.data;

    try {
        await signIn("credentials", { email, password, redirectTo: "/profile" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { success: false, message: "Invalid email or password" };
                default:
                    return { success: false, message: "Something went wrong" };
            }
        }
        throw error;
    }

    return { success: true, message: "Logged in successfully" }
}

// Register Action
export const registerAction = async (data: z.infer<typeof RegisterSchema>) => {
    const validation = RegisterSchema.safeParse(data);
    if (!validation.success)
        return { success: false, message: "Invalid credentials" };

    const { name, password, email } = validation.data;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) return { success: false, message: "User already exist" };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await prisma.user.create({
            data: { email, name, password: hashedPassword }
        });

        return { success: true, message: "Registered successfully" };

    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong, please try again" };
    }
}

// Logout
export const logoutAction = async () => {
    await signOut();
}