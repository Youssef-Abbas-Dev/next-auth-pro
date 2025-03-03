"use server";
import { prisma } from "@/utils/prisma";
import { z } from "zod";
import { ForgotPasswordSchema } from "@/utils/validationSchmas";
import { generateResetPasswordToken } from "@/utils/generateToken";
import { sendResetPasswordToken } from "@/utils/mail";
import { ActionType } from "@/utils/types";

// Forgot Password Action
export const forgotPasswordAction = async (props: z.infer<typeof ForgotPasswordSchema>): Promise<ActionType> => {
    try {
        const validation = ForgotPasswordSchema.safeParse(props);
        if (!validation.success)
            return { success: false, message: validation.error.errors[0].message };

        const { email } = validation.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return { success: false, message: 'User not found' };

        const resetPasswordToken = await generateResetPasswordToken(email);
        await sendResetPasswordToken(resetPasswordToken.email, resetPasswordToken.token);
        return { success: true, message: "Reset password link sent. check your email" }

    } catch (error) {
        console.log(error);
        return { success: false, message: 'Something went wrong' };
    }
}