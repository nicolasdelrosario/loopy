import z from "zod";

export const confirmResetPasswordSchema = z.object({
	email: z.email({ message: "Invalid email address" }),
});

export type ConfirmResetPasswordSchema = z.infer<
	typeof confirmResetPasswordSchema
>;
