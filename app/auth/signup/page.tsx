"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Linkedin } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { type SignUpSchema, signUpSchema } from "@/schemas/auth/signUpSchema";
import { AuthService } from "@/services/authService";

export default function SignUp() {
	const router = useRouter();

	const form = useForm<SignUpSchema>({
		defaultValues: {
			confirmPassword: "",
			email: "",
			firstName: "",
			lastName: "",
			password: "",
			terms: false,
		},
		mode: "onSubmit",
		resolver: zodResolver(signUpSchema),
	});

	const signUp: SubmitHandler<SignUpSchema> = async (data) => {
		const service = new AuthService();

		try {
			await service.signUp(data);

			router.push("/auth/signin");
			toast("Account created.", {
				description: "Please check your email to verify your account.",
			});
		} catch {
			toast("Could not create account. Please try again.");
		}
	};

	const signUpWithLinkedIn = async () => {
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
								<div className="size-4 border-2 border-white rounded-full"></div>
							</div>
							<span className="text-xl font-bold ">Loopy</span>
						</div>
						<CardTitle className="text-2xl ">Create your account</CardTitle>
						<CardDescription>
							Start building better habits today
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Form {...form}>
							<form className="space-y-4" onSubmit={form.handleSubmit(signUp)}>
								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>First name</FormLabel>
												<FormControl>
													<Input placeholder="John" type="text" {...field} />
												</FormControl>
												<FormMessage className="text-xs min-h-[20px]" />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last name</FormLabel>
												<FormControl>
													<Input placeholder="Doe" type="text" {...field} />
												</FormControl>
												<FormMessage className="text-xs min-h-[20px]" />
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
													placeholder="john@example.com"
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
													placeholder="Create a strong password"
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
											<FormLabel>Confirm password</FormLabel>
											<FormControl>
												<Input
													placeholder="Confirm your password"
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
									name="terms"
									render={({ field }) => (
										<FormItem>
											<div className="flex items-center space-x-2">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<FormLabel className="text-sm">
													I agree to the{" "}
													<Link className="underline" href="/terms">
														Terms of Service
													</Link>{" "}
													and{" "}
													<Link className="underline" href="/privacy">
														Privacy Policy
													</Link>
												</FormLabel>
											</div>

											<FormMessage className="text-xs min-h-[20px]" />
										</FormItem>
									)}
								/>

								<Button
									className="w-full cursor-pointer"
									disabled={form.formState.isSubmitting}
									type="submit"
								>
									{form.formState.isSubmitting
										? "Creating..."
										: "Create Account"}
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
							onClick={signUpWithLinkedIn}
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
							Sign up with LinkedIn
						</Button>
						<Separator className="bg-zinc-100" />

						<div className="text-center text-sm ">
							Already have an account?{" "}
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
