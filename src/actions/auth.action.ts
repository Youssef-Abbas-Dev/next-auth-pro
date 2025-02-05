"use server";
import { LoginSchema, RegisterSchema } from "@/utils/validationSchmas";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import * as bcrypt from 'bcryptjs';

// Login Action
export const loginAction = async (data: z.infer<typeof LoginSchema>) => {
    const validation = LoginSchema.safeParse(data);
    if (!validation.success)
        return { error: "Invalid credentials" };

    console.log(data);
    return { success: "Logged in successfully" }
}

// Register Action
export const registerAction = async (data: z.infer<typeof RegisterSchema>) => {
    const validation = RegisterSchema.safeParse(data);
    if (!validation.success)
        return { success: false, message: "Invalid credentials" };

    const { name, password, email } = validation.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) return { success: false, message: "User already exist" };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data: { email, name, password: hashedPassword }
    });

    return { success: true, message: "Registered successfully" }
}