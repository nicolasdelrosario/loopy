import Link from "next/link";
import { Logo } from "@/components/logo";

export default function Footer() {
	return (
		<footer className="border-t border-border bg-background py-12">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<Logo size="md" withLink={false} />
					<div className="flex items-center gap-6 text-muted-foreground">
						<Link href="/privacy">Privacy</Link>
						<Link href="/terms">Terms</Link>
						<Link href="/contact">Contact</Link>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
					<p>&copy; 2025 Loopy. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
