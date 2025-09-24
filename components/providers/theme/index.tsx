"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Theme({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
