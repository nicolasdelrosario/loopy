"use client";

import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { AddHabitSchema } from "@/schemas/habit";

type Props = {
	form: UseFormReturn<AddHabitSchema>;
	onSubmit: (values: AddHabitSchema) => void | Promise<void>;
	submitLabel?: string;
	submittingLabel?: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function HabitForm({
	form,
	onSubmit,
	submitLabel = "Save Habit",
	submittingLabel = "Saving...",
	setOpen,
}: Props) {
	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Habit Name</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. Drink 8 glasses of water"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description (Optional)</FormLabel>
								<FormControl>
									<Input
										placeholder="Why is this habit important to you?"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="frequency"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Frequency</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select frequency" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="daily">Daily</SelectItem>
											<SelectItem value="weekly">Weekly</SelectItem>
											<SelectItem value="monthly">Monthly</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button
							onClick={() => setOpen(false)}
							type="button"
							variant="outline"
						>
							Cancel
						</Button>
					</DialogClose>

					<Button disabled={form.formState.isSubmitting} type="submit">
						{form.formState.isSubmitting ? submittingLabel : submitLabel}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
