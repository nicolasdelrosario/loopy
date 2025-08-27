import { Inter } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/utils/construct-metadata";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata = constructMetadata({});

type Props = {
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} antialiased min-h-screen min-w-screen`}
			>
				{children}
			</body>
		</html>
	);
}
