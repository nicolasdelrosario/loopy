"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function Sooner() {
	const { theme } = useTheme();

	return (
		<Toaster
			position="bottom-right"
			theme={theme as "light" | "dark" | "system"}
		/>
	);
}
