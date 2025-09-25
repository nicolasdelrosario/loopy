"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Profile,
	UpdateProfileSchema,
	updateProfileSchema,
} from "@/schemas/profile";
import { createClient } from "@/utils/supabase/client";

type Props = {
	profile: Profile;
};

export default function ProfileForm({ profile }: Props) {
	const form = useForm<UpdateProfileSchema>({
		defaultValues: {
			bio: profile?.bio || "",
			email: profile?.email || "",
			first_name: profile?.first_name || "",
			last_name: profile?.last_name || "",
		},
		mode: "onSubmit",
		resolver: zodResolver(updateProfileSchema),
	});

	const onSubmit: SubmitHandler<UpdateProfileSchema> = async (data) => {
		const supabase = createClient();

		try {
			const { error } = await supabase
				.from("profiles")
				.update(data)
				.eq("id", profile.id);

			if (!error) {
				toast.success("Profile updated successfully.", {
					description: "Your changes have been saved.",
				});
			}
		} catch {
			toast.error("Could not update profile. Please try again.");
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Personal Information</CardTitle>
				<CardDescription>Update your personal details and bio.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="Enter your first name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Enter your last name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your email"
											type="email"
											{...field}
										/>
									</FormControl>
									<p className="text-xs text-muted-foreground">
										Email changes require verification. You&apos;ll receive a
										confirmation email.
									</p>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us about yourself and your habit journey..."
											rows={4}
											{...field}
										/>
									</FormControl>
									<p className="text-xs text-muted-foreground">
										Share your story, goals, or what motivates you to build
										better habits.
									</p>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end">
							<Button disabled={form.formState.isSubmitting} type="submit">
								{form.formState.isSubmitting ? "Saving..." : "Save changes"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
