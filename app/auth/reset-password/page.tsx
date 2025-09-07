"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import {
	ResetPasswordSchema,
	resetPasswordSchema,
} from "@/schemas/auth/resetPasswordSchema";
import { AuthService } from "@/services/authService";
import { ResetPasswordUseCase } from "@/usecases/auth/resetPasswordUseCase";

export default function ResetPassword() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const code = searchParams.get("code");

	const form = useForm<ResetPasswordSchema>({
		defaultValues: {
			confirmPassword: "",
			password: "",
		},
		mode: "onSubmit",
		resolver: zodResolver(resetPasswordSchema),
	});

	const resetPassword: SubmitHandler<ResetPasswordSchema> = async (data) => {
		if (!code) {
			return toast("Invalid or missing reset code.");
		}

		const service = new AuthService();
		const resetPassword = new ResetPasswordUseCase(service);

		try {
			await resetPassword.run(data);

			toast("Password reset successful", {
				description: "You can now sign in with your new password.",
			});

			router.push("/auth/signin");
		} catch (error) {
			console.log("error", error);
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
						<div className="flex items-center justify-center gap-2 mb-4">
							<div className="w-8 h-8 bg-primary/96 rounded-full flex items-center justify-center">
								<div className="w-4 h-4 border-2 border-white rounded-full"></div>
							</div>
							<span className="text-xl font-bold ">Loopy</span>
						</div>
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
