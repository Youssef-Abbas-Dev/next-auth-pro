"use server";
import { LoginSchema, RegisterSchema } from "@/utils/validationSchmas";
import { z } from "zod";

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
        return { error: "Invalid credentials" };

    console.log(data);
    return { success: "Registered successfully" }
}