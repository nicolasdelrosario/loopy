import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t border-zinc-200 bg-white py-12">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-primary/96 rounded-full flex items-center justify-center">
							<div className="w-4 h-4 border-2 border-white rounded-full"></div>
						</div>
						<span className="text-xl font-bold ">Loopy</span>
					</div>
					<div className="flex items-center gap-6 ">
						<Link href="/privacy">Privacy</Link>
						<Link href="/terms">Terms</Link>
						<Link href="/contact">Contact</Link>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-zinc-100 text-center ">
					<p>&copy; 2025 Loopy. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
