import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const signOut = async () => {
		"use server";

		const supabase = await createClient();
		await supabase.auth.signOut();

		redirect("/");
	};

	return (
		<header className="border-b border-border bg-gradient-to-r from-background via-background/95 to-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<Logo size="md" withLink />

				{/* Nav */}
				<nav className="hidden md:flex items-center gap-6">
					<Link
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						href="#features"
					>
						Features
					</Link>
					<Link
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						href="#how-it-works"
					>
						How it Works
					</Link>

					{user ? (
						<>
							<Button asChild variant="outline">
								<Link href="/dashboard/home">Dashboard</Link>
							</Button>
							<form action={signOut}>
								<Button
									className="cursor-pointer"
									type="submit"
									variant="destructive"
								>
									Sign Out
								</Button>
							</form>
						</>
					) : (
						<>
							<Button asChild variant="outline">
								<Link href="/auth/signin">Sign In</Link>
							</Button>
							<Button asChild>
								<Link href="/auth/signup">Get Started</Link>
							</Button>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}
