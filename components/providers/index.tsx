import ReactScan from "@/components/providers/react-scan";
import { Theme } from "@/components/providers/theme";
import { env } from "@/config/env";

type ProvidersProps = {
	children: React.ReactNode;
};

function Providers({ children }: ProvidersProps) {
	return (
		<>
			{env.NODE_ENV === "development" && (
				<>
					<ReactScan />
				</>
			)}
			<Theme
				attribute="class"
				defaultTheme="system"
				disableTransitionOnChange
				enableSystem
			>
				{children}
			</Theme>
		</>
	);
}

export default Providers;
