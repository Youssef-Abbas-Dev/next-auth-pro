"use server";
import { prisma } from "@/utils/prisma";
import { z } from "zod";
import { ForgotPasswordSchema, ResetPasswordSchema } from "@/utils/validationSchmas";
import { generateResetPasswordToken } from "@/utils/generateToken";
import { sendResetPasswordToken } from "@/utils/mail";
import { ActionType } from "@/utils/types";
import * as bcrypt from 'bcryptjs';

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

// Reset Password Action 
export const resetPasswordAction = async (props: z.infer<typeof ResetPasswordSchema>, token: string): Promise<ActionType> => {
    try {
        const validation = ResetPasswordSchema.safeParse(props);
        if (!validation.success)
            return { success: false, message: validation.error.errors[0].message };

        const { newPassword } = validation.data;
        const resetPasswordToken = await prisma.resetPasswordToken.findUnique({ where: { token } });
        if (!resetPasswordToken)
            return { success: false, message: 'token not found' };

        const isExpired = new Date(resetPasswordToken.expires) < new Date();
        if (isExpired)
            return { success: false, message: 'token is expired' };

        const user = await prisma.user.findUnique({ where: { email: resetPasswordToken.email } });
        if (!user)
            return { success: false, message: 'user not found' };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        });

        await prisma.resetPasswordToken.delete({ where: { id: resetPasswordToken.id } });
        return { success: true, message: 'Your password has been changed, please log in' };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" }
    }
}