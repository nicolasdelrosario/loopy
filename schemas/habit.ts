import z from "zod";

export const habitSchema = z.object({
	created_at: z.date(),
	deleted_at: z.date().nullable().optional(),
	description: z.string().optional(),
	frequency: z
		.enum(["daily", "weekly", "monthly"])
		.describe("Please select a frequency"),
	id: z.uuid(),
	is_completed: z.boolean().default(true),
	name: z.string().min(2, "Habit name must be at least 2 characters"),
	updated_at: z.date(),
});

export type Habit = z.infer<typeof habitSchema>;

export const addHabitSchema = habitSchema.omit({
	created_at: true,
	deleted_at: true,
	id: true,
	is_completed: true,
	updated_at: true,
});

export type AddHabitSchema = z.infer<typeof addHabitSchema>;
