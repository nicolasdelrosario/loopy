import z from "zod";

export const profileSchema = z.object({
	avatar_url: z.url().nullable().optional(),
	bio: z.string().max(500, "Bio must be less than 500 characters"),
	created_at: z.date(),
	deleted_at: z.date().nullable().optional(),
	email: z.email({ message: "Invalid email address" }),
	first_name: z.string().min(1, { message: "First name is required" }),
	id: z.uuid(),
	last_name: z.string().min(1, { message: "Last name is required" }),
	updated_at: z.date(),
});

export type Profile = z.infer<typeof profileSchema>;

export const updateProfileSchema = z.object({
	bio: z.string().max(500, "Bio must be less than 500 characters"),
	email: z.email("Please enter a valid email address"),
	first_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
