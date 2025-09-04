"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { type SignInSchema, signInSchema } from "@/schemas/auth/signInSchema";
import { AuthService } from "@/services/authService";
import { SignInUseCase } from "@/usecases/auth/signInUseCase";

export default function SignIn() {
	const router = useRouter();

	const form = useForm<SignInSchema>({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onSubmit",
		resolver: zodResolver(signInSchema),
	});

	const signIn: SubmitHandler<SignInSchema> = async (data) => {
		const authService = new AuthService();
		const signInUseCase = new SignInUseCase(authService);

		try {
			await signInUseCase.run(data);

			router.push("/dashboard/home");
			toast("Signed in.", {
				description: "Welcome back!",
			});
		} catch (error) {
			toast("Could not sign in. Please try again.");
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
						<div className="flex items-center justify-center gap-2 mb-4">
							<div className="w-8 h-8 bg-primary/96 rounded-full flex items-center justify-center">
								<div className="w-4 h-4 border-2 border-white rounded-full"></div>
							</div>
							<span className="text-xl font-bold ">Loopy</span>
						</div>
						<CardTitle className="text-2xl ">Welcome back</CardTitle>
						<CardDescription>
							Sign in to continue your habit journey
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Form {...form}>
							<form className="space-y-4" onSubmit={form.handleSubmit(signIn)}>
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

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your password"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-xs min-h-[20px]" />
										</FormItem>
									)}
								/>

								<div className="flex items-center justify-between text-sm underline">
									<Link href="/auth/forgot-password">Forgot password?</Link>
								</div>

								<Button
									className="w-full"
									disabled={form.formState.isSubmitting}
									type="submit"
								>
									{form.formState.isSubmitting ? "Signing in..." : "Sign in"}
								</Button>
							</form>
						</Form>

						<Separator className="bg-zinc-100" />

						<div className="text-center text-sm ">
							Don't have an account?{" "}
							<Link className=" font-medium" href="/auth/signup">
								Sign up
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
