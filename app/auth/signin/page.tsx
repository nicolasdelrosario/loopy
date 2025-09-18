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
		const service = new AuthService();

		try {
			await service.signIn(data);

			router.push("/dashboard/home");
			toast("Signed in.", {
				description: "Welcome back!",
			});
		} catch (error) {
			toast("Could not sign in. Please try again.");
		}
	};

		const signInWithLinkedin = async () => {
		const service = new AuthService();

		try {
			await service.signInWithLinkedIn();

			toast("LinkedIn account linked.");
		} catch {
			toast("Could not link LinkedIn account. Please try again.");
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

						<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
							<span className="bg-background text-muted-foreground relative z-10 px-2">
								Or continue with
							</span>
						</div>
						<Button
							className="w-full cursor-pointer"
							onClick={signInWithLinkedin}
							type="button"
							variant="outline"
						>
							<svg
								height="24"
								version="1.1"
								viewBox="0 0 24 24"
								width="24"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
							>
								<path
									d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z"
									fill="currentColor"
								/>
							</svg>
							Sign in with LinkedIn
						</Button>
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
