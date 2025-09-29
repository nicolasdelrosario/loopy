"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { AddHabitSchema, addHabitSchema, Habit } from "@/schemas/habit";
import { Profile } from "@/schemas/profile";
import { createClient } from "@/utils/supabase/client";
import HabitForm from "../habit-form";

type Props = {
	habit: Habit;
	profile: Profile;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditHabit({ habit, profile, open, setOpen }: Props) {
	const router = useRouter();

	const form = useForm<AddHabitSchema>({
		defaultValues: {
			description: habit.description ?? "",
			frequency: habit.frequency,
			name: habit.name,
		},
		resolver: zodResolver(addHabitSchema),
	});

	const onSubmit = async (data: AddHabitSchema) => {
		const supabase = createClient();

		try {
			const { error } = await supabase
				.from("habits")
				.update(data)
				.eq("id", habit.id)
				.eq("user_id", profile.id);

			if (!error) {
				toast.success("Habit updated.");
				setOpen(false);
				router.refresh();
			}
		} catch {
			toast.error("Could not update habit. Please try again.");
		}
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Habit</DialogTitle>
					<DialogDescription>
						Update your habit details below.
					</DialogDescription>
				</DialogHeader>

				<HabitForm
					form={form}
					onSubmit={onSubmit}
					setOpen={setOpen}
					submitLabel="Update Habit"
					submittingLabel="Updating..."
				/>
			</DialogContent>
		</Dialog>
	);
}
