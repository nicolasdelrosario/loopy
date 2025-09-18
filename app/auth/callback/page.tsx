"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { AuthService } from "@/services/authService";

export default function AuthCallback() {
	const router = useRouter();

	useEffect(() => {
		const handleCallback = async () => {
			const service = new AuthService();

			try {
				const session = await service.getCurrentSession();

				if (session) {
					const user = await service.getCurrentUser();
					const isNewUser = user.created_at === user.updated_at;

					if (isNewUser) {
						toast("Welcome to Loopy!", {
							description:
								"Your account has been created successfully with LinkedIn.",
						});
					} else {
						toast("Welcome back!", {
							description: "Successfully signed in with LinkedIn.",
						});
					}

					router.push("/dashboard/home");
				} else {
					throw new Error("No session found after callback");
				}
			} catch (error) {
				toast("Authentication failed", {
					description:
						"There was an error during the LinkedIn authentication process.",
				});

				router.push("/auth/signin");
			}
		};

		handleCallback();
	}, [router]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-neutral-100 flex items-center justify-center p-4">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
				<h2 className="text-lg font-semibold mb-2">
					Completing LinkedIn authentication...
				</h2>
				<p className="text-muted-foreground">
					Please wait while we set up your account.
				</p>
			</div>
		</div>
	);
}
