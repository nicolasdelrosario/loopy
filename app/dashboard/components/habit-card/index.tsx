"use client";

import {
	CheckCircle2,
	Circle,
	MoreVertical,
	Pencil,
	Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Habit } from "@/schemas/habit";
import { Profile } from "@/schemas/profile";
import { createClient } from "@/utils/supabase/client";
import DeleteHabit from "../delete-habit";
import EditHabit from "../edit-habit";

type Props = {
	habit: Habit;
	profile: Profile;
};

export default function HabitCard({ habit, profile }: Props) {
	const router = useRouter();
	const [isCompleted, setIsCompleted] = useState(habit.is_completed);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const toggleHabit = async () => {
		const supabase = createClient();
		const newValue = !isCompleted;
		setIsCompleted(newValue);

		try {
			const { error } = await supabase
				.from("habits")
				.update({
					is_completed: newValue,
				})
				.eq("id", habit.id)
				.eq("user_id", profile.id);

			if (!error) {
				toast.success("Habit updated successfully.");
				router.refresh();
			}
		} catch {
			toast.error("Could not update habit. Please try again.");
			setIsCompleted(habit.is_completed);
		}
	};

	return (
		<Card className="border-border transition-colors hover:bg-muted/50">
			<CardContent className="p-4">
				<div className="flex items-start gap-4">
					<Button
						className={cn("size-8 rounded-full transition-colors", {
							"text-muted-foreground hover:text-foreground": !isCompleted,
							"text-primary hover:text-primary": isCompleted,
						})}
						onClick={toggleHabit}
						size="icon"
						variant="ghost"
					>
						{isCompleted ? (
							<CheckCircle2 className="size-5" />
						) : (
							<Circle className="size-5" />
						)}
					</Button>

					<div className="flex-1 space-y-1">
						<h3
							className={cn("font-medium", {
								"text-foreground": !isCompleted,
								"text-muted-foreground line-through": isCompleted,
							})}
						>
							{habit.name}
						</h3>
						{habit.description && (
							<p
								className={cn("text-sm text-muted-foreground", {
									"line-through": isCompleted,
								})}
							>
								{habit.description}
							</p>
						)}
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="text-muted-foreground hover:text-foreground"
								size="icon"
								variant="ghost"
							>
								<MoreVertical className="size-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setEditOpen(true)}>
								<Pencil className="mr-2 size-4" />
								Edit
							</DropdownMenuItem>

							<DropdownMenuItem onClick={() => setDeleteOpen(true)}>
								<Trash className="mr-2 size-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<EditHabit
						habit={habit}
						open={editOpen}
						profile={profile}
						setOpen={setEditOpen}
					/>

					<DeleteHabit
						habit={habit}
						open={deleteOpen}
						profile={profile}
						setOpen={setDeleteOpen}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
