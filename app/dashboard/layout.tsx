import { redirect } from "next/navigation";
import Header from "@/app/dashboard/components/header";
import { createClient } from "@/utils/supabase/server";

type Props = {
	children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/");
	}

	return (
		<>
			<Header />
			{children}
		</>
	);
}
