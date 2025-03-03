import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export const RegisterSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be of type string"
    }).min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email" })
});