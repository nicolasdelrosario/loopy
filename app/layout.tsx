import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { constructMetadata } from "@/utils/construct-metadata";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata = constructMetadata({});

type Props = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body className={`${inter.variable} antialiased min-h-screen`}>
				<Providers>{children}</Providers>
				<Toaster position="top-right" />
			</body>
		</html>
	);
}
