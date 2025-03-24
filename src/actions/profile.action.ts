"use server";
import { prisma } from "@/utils/prisma";
import { z } from "zod";
import { UpdateProfileSchema } from "@/utils/validationSchmas";
import { ActionType } from "@/utils/types";

// Update Profile Action
export const updateProfileAction = async (props: z.infer<typeof UpdateProfileSchema>, userId: string): Promise<ActionType> => {
    try {
        const validation = UpdateProfileSchema.safeParse(props);
        if (!validation.success)
            return { success: false, message: "Invalid name" };

        const { name } = validation.data;
        await prisma.user.update({
            where: { id: userId },
            data: { name }
        });
        return { success: true, message: "Updated" }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" }
    }
}