import { prisma } from "./prisma";
import { randomUUID, randomInt } from "node:crypto";

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


// Generate Two Step Token
export const generateTwoStepToken = async (email: string) => {
    const twoStepToken = await prisma.twoStepToken.findFirst({ where: { email } });
    if (twoStepToken) {
        await prisma.twoStepToken.delete({ where: { id: twoStepToken.id } });
    }

    const newTwoStepToken = await prisma.twoStepToken.create({
        data: {
            token: randomInt(100000, 1000000).toString(),
            expires: new Date(new Date().getTime() + 3600 * 1000),
            email
        }
    });
    return newTwoStepToken;
}