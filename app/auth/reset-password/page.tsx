"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
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
import { Separator } from "@/components/ui/separator";
import {
	ResetPasswordSchema,
	resetPasswordSchema,
} from "@/schemas/auth/resetPasswordSchema";
import { AuthService } from "@/services/authService";

export default function ResetPassword() {
	const router = useRouter();

	const form = useForm<ResetPasswordSchema>({
		defaultValues: {
			confirmPassword: "",
			password: "",
		},
		mode: "onSubmit",
		resolver: zodResolver(resetPasswordSchema),
	});

	const resetPassword: SubmitHandler<ResetPasswordSchema> = async (data) => {
		const service = new AuthService();

		try {
			await service.resetPassword(data);

			toast("Password reset successful", {
				description: "You can now sign in with your new password.",
			});

			router.push("/auth/signin");
		} catch {
			toast("Password reset failed. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-neutral-100 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<Link
					className="inline-flex items-center gap-2 transition-colors mb-8"
					href="/"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Home
				</Link>

				<Card className="border-zinc-100 shadow-lg">
					<CardHeader className="text-center">
						<Logo className="justify-center mb-4" size="md" withLink={false} />
						<CardTitle className="text-2xl">Choose a new password</CardTitle>
						<CardDescription>
							Enter and confirm your new password to finish resetting your
							account.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						<Form {...form}>
							<form
								className="space-y-4"
								onSubmit={form.handleSubmit(resetPassword)}
							>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>New Password</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter new password"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-xs min-h-[20px]" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<Input
													placeholder="Confirm new password"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-xs min-h-[20px]" />
										</FormItem>
									)}
								/>

								<Button
									className="w-full"
									disabled={form.formState.isSubmitting}
									type="submit"
								>
									{form.formState.isSubmitting
										? "Resetting..."
										: "Reset Password"}
								</Button>
							</form>
						</Form>

						<Separator className="bg-zinc-100" />

						<div className="text-center text-sm">
							Remember your password?{" "}
							<Link className="font-medium" href="/auth/signin">
								Sign in
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
