"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { AddHabitSchema, addHabitSchema } from "@/schemas/habit";
import { Profile } from "@/schemas/profile";
import { createClient } from "@/utils/supabase/client";
import HabitForm from "../habit-form";

type Props = {
	profile: Profile;
};

export default function AddHabit({ profile }: Props) {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<AddHabitSchema>({
		defaultValues: { description: "", frequency: "daily", name: "" },
		resolver: zodResolver(addHabitSchema),
	});

	const onSubmit = async (data: AddHabitSchema) => {
		const supabase = createClient();

		try {
			const { error } = await supabase.from("habits").insert({
				...data,
				user_id: profile.id,
			});

			if (!error) {
				toast.success("Habit created successfully.");
				form.reset();
				setOpen(false);
				router.refresh();
			}
		} catch {
			toast.error("Could not create habit. Please try again.");
		}
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button variant="outline">Add Habit</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Habit</DialogTitle>
					<DialogDescription>
						Add a new habit to track. Start small and be consistent.
					</DialogDescription>
				</DialogHeader>

				<HabitForm
					form={form}
					onSubmit={onSubmit}
					setOpen={setOpen}
					submitLabel="Save Habit"
					submittingLabel="Saving..."
				/>
			</DialogContent>
		</Dialog>
	);
}
