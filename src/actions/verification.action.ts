"use server";
import { prisma } from '@/utils/prisma';

export const verifyingEmailAction = async (token: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({ where: { token } });
        if (!verificationToken)
            return { success: false, message: 'token not found' };

        const isExpired = new Date(verificationToken.expires) < new Date();
        if (isExpired)
            return { success: false, message: 'token is expired' };

        const user = await prisma.user.findUnique({ where: { email: verificationToken.email } });
        if (!user)
            return { success: false, message: 'user not found' };

        await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }
        });

        await prisma.verificationToken.delete({ where: { id: verificationToken.id } });
        return { success: true, message: 'Your email address was successfully verified' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Something went wrong' };
    }
}