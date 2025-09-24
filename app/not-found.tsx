import { Frown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
	return (
		<main className="flex min-h-[100dvh] items-center justify-center px-4">
			<Card className="w-full max-w-md">
				<CardContent className="flex flex-col items-center text-center space-y-6 p-8">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
						<Frown className="h-8 w-8 text-muted-foreground" />
					</div>

					<div className="space-y-2">
						<h1 className="text-2xl font-semibold text-foreground">
							Page not found
						</h1>
						<p className="text-sm text-muted-foreground">
							Sorry, we couldn't find the page you're looking for. It might have
							been removed or you may have mistyped the address.
						</p>
					</div>

					<Button asChild>
						<Link href="/">Back to home</Link>
					</Button>
				</CardContent>
			</Card>
		</main>
	);
}
