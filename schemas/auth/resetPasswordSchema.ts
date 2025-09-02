import z from "zod";

export const resetPasswordSchema = z
	.object({
		confirmPassword: z.string().min(6, "Please confirm your password"),
		password: z.string().min(6, "Password must be at least 6 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
