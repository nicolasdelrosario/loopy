import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
	const supabase = await createClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const signOut = async () => {
		"use server";

		const supabase = await createClient();
		await supabase.auth.signOut();

		redirect("/auth/signin");
	};

	return (
		<header className="border-b backdrop-blur-sm">
			<div className="mx-auto container px-4 py-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-primary/96 rounded-full flex items-center justify-center">
						<div className="w-4 h-4 border-2 border-white rounded-full"></div>
					</div>
					<span className="text-xl font-bold ">Loopy</span>
				</div>
				<nav className="hidden md:flex items-center gap-6">
					<Link href="#features">Features</Link>
					<Link href="#how-it-works">How it Works</Link>
					{session ? (
						<>
							<Button asChild className="bg-transparent" variant="outline">
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
							<Button asChild className="bg-transparent" variant="outline">
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
