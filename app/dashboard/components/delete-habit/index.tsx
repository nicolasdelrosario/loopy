"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Habit } from "@/schemas/habit";
import { Profile } from "@/schemas/profile";
import { createClient } from "@/utils/supabase/client";

type Props = {
	habit: Habit;
	profile: Profile;
	open: boolean;
	setOpen: (value: boolean) => void;
};

export default function DeleteHabit({ habit, profile, open, setOpen }: Props) {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		if (isDeleting) return;
		setIsDeleting(true);

		try {
			const supabase = createClient();

			const { error } = await supabase
				.from("habits")
				.delete()
				.eq("id", habit.id)
				.eq("user_id", profile.id);

			if (error) {
				toast.error("Could not delete the habit. Please try again.");
				setIsDeleting(false);
				return;
			}

			toast.success("Habit deleted successfully.");
			setOpen(false);
			router.refresh();
		} catch (err) {
			toast.error("Could not delete the habit. Please try again.");
			setIsDeleting(false);
		}
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Habit</DialogTitle>
					<DialogDescription>
						{habit.name
							? `You are about to delete "${habit.name}". This action cannot be undone.`
							: "You are about to delete this habit. This action cannot be undone."}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="flex gap-2">
					<Button
						disabled={isDeleting}
						onClick={() => setOpen(false)}
						variant="outline"
					>
						Cancel
					</Button>

					<Button
						className="flex items-center gap-2"
						disabled={isDeleting}
						onClick={handleDelete}
						variant="destructive"
					>
						<Trash className="h-4 w-4" />
						{isDeleting ? "Deleting..." : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
