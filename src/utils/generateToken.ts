import { prisma } from "./prisma";
import { randomUUID } from "node:crypto";

// Generate Verification Token
export const generateVerificationToken = async (email: string) => {
    const verificationToken = await prisma.verificationToken.findFirst({ where: { email } });
    if (verificationToken) {
        await prisma.verificationToken.delete({ where: { id: verificationToken.id } });
    }

    const newVerificationToken = await prisma.verificationToken.create({
        data: {
            token: randomUUID(),
            expires: new Date(new Date().getTime() + 3600 * 1000 * 2),
            email
        }
    });
    return newVerificationToken;
}


// Generate Reset Password Token
export const generateResetPasswordToken = async (email: string) => {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({ where: { email } });
    if (resetPasswordToken) {
        await prisma.resetPasswordToken.delete({ where: { id: resetPasswordToken.id } });
    }

    const newResetPasswordToken = await prisma.resetPasswordToken.create({
        data: {
            token: randomUUID(),
            expires: new Date(new Date().getTime() + 3600 * 1000 * 2),
            email
        }
    });
    return newResetPasswordToken;
}