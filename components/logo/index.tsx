import Link from "next/link";

export function Logo({
	withLink = true,
	size = "md",
	className = "",
}: {
	withLink?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
}) {
	const sizeClasses = {
		lg: "w-10 h-10",
		md: "w-8 h-8",
		sm: "w-6 h-6",
	};

	const innerSizeClasses = {
		lg: "w-4 h-4",
		md: "w-3 h-3",
		sm: "w-2 h-2",
	};

	const logo = (
		<div className={`flex items-center gap-2 ${className}`}>
			<div
				className={`${sizeClasses[size]} rounded-full bg-primary flex items-center justify-center`}
			>
				<div
					className={`${innerSizeClasses[size]} rounded-full bg-background`}
				/>
			</div>
			<span className="text-lg font-semibold text-foreground">Loopy</span>
		</div>
	);

	if (withLink) {
		return <Link href="/">{logo}</Link>;
	}

	return logo;
}
