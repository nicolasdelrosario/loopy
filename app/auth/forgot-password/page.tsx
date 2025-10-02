"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
	ConfirmResetPasswordSchema,
	confirmResetPasswordSchema,
} from "@/schemas/auth/confirmResetPasswordSchema";
import { AuthService } from "@/services/authService";

export default function ForgotPassword() {
	const form = useForm<ConfirmResetPasswordSchema>({
		defaultValues: {
			email: "",
		},
		mode: "onSubmit",
		resolver: zodResolver(confirmResetPasswordSchema),
	});

	const confirmResetPassword: SubmitHandler<
		ConfirmResetPasswordSchema
	> = async (data) => {
		const service = new AuthService();

		try {
			await service.confirmResetPassword(data);

			toast("Password reset email sent.", {
				description: "Check your inbox for the reset link.",
			});
		} catch (error) {
			toast("Could not confirm reset password. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-neutral-100 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Back to home link */}
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
						<CardTitle className="text-2xl ">Reset your password</CardTitle>
						<CardDescription>
							Enter your email address and we'll send you a link to reset your
							password
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Form {...form}>
							<form
								className="space-y-4"
								onSubmit={form.handleSubmit(confirmResetPassword)}
							>
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
										? "Sending..."
										: "Send Reset Link"}
								</Button>
							</form>
						</Form>

						<Separator className="bg-zinc-100" />

						<div className="text-center text-sm ">
							Remember your password?{" "}
							<Link className=" font-medium" href="/auth/signin">
								Sign in
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
