"use server";
import { LoginSchema, RegisterSchema } from "@/utils/validationSchmas";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import * as bcrypt from 'bcryptjs';
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { generateTwoStepToken, generateVerificationToken } from "@/utils/generateToken";
import { sendTwoStepToken, sendVerificationToken } from "@/utils/mail";
import { ActionType, LoginType } from "@/utils/types";

// Login Action
export const loginAction = async (data: z.infer<typeof LoginSchema>): Promise<LoginType> => {
    const validation = LoginSchema.safeParse(data);
    if (!validation.success)
        return { success: false, message: "Invalid credentials" };

    const { email, password, code } = validation.data;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.email || !user.password)
            return { success: false, message: "Invalid credentials" };

        if (!user.emailVerified) {
            const verificationToken = await generateVerificationToken(email);
            await sendVerificationToken(verificationToken.email, verificationToken.token);

            return { success: true, message: "Email sent. verify your email" };
        }

        if (user.isTwoStepEnabled && user.email) {
            if (code) {
                const twoStepTokenFromDb = await prisma.twoStepToken.findFirst({ where: { email: user.email } });
                if (!twoStepTokenFromDb)
                    return { success: false, message: "No token provided" };

                if (twoStepTokenFromDb.token !== code)
                    return { success: false, message: "Invalid code" };

                const isExpired = new Date(twoStepTokenFromDb.expires) < new Date();
                if (isExpired)
                    return { success: false, message: "Token is expired" };

                await prisma.twoStepToken.delete({ where: { id: twoStepTokenFromDb.id } });

                const twoStepConfirmation = await prisma.twoStepConfirmation.findUnique({ where: { userId: user.id } });
                if (twoStepConfirmation)
                    await prisma.twoStepConfirmation.delete({ where: { id: twoStepConfirmation.id } });

                await prisma.twoStepConfirmation.create({
                    data: { userId: user.id }
                });
            } else {
                const twoStepToken = await generateTwoStepToken(user.email);
                await sendTwoStepToken(twoStepToken.email, twoStepToken.token);
                return { success: true, message: "Confirmation code sent to your email", twoStep: true };
            }
        }

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
export const registerAction = async (data: z.infer<typeof RegisterSchema>): Promise<ActionType> => {
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

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationToken(verificationToken.email, verificationToken.token);

        return { success: true, message: "Email sent. verify your email" };

    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong, please try again" };
    }
}

// Logout
export const logoutAction = async (): Promise<void> => {
    await signOut();
}

// Toggle Two Step
export const toggleTwoStepAction = async (userId: string, isEnabled: boolean): Promise<ActionType> => {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { isTwoStepEnabled: isEnabled }
        });
        return { success: true, message: "success" }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" }
    }
}