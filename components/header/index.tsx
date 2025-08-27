import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
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
					<Button asChild className="bg-transparent" variant="outline">
						<Link href="/auth/signin">Sign In</Link>
					</Button>
					<Button asChild>
						<Link href="/auth/signup">Get Started</Link>
					</Button>
				</nav>
			</div>
		</header>
	);
}
