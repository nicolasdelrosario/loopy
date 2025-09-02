import z from "zod";

export const signUpSchema = z
	.object({
		confirmPassword: z.string(),
		email: z.email({ message: "Invalid email address" }),
		firstName: z.string().min(1, { message: "Name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" }),
		terms: z.boolean().refine((val) => val, {
			message: "You must accept the terms",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;
