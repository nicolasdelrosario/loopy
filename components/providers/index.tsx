import ReactScan from "@/components/providers/react-scan";
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
			{children}
		</>
	);
}

export default Providers;
