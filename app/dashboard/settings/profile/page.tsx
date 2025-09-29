import ProfileForm from "@/app/dashboard/settings/components/profile-form";
import ProfileOverview from "@/app/dashboard/settings/components/profile-overview";
import StatsOverview from "@/app/dashboard/settings/components/stats-overview";
import { createClient } from "@/utils/supabase/server";

export default async function Profile() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return null;

	const { data: profile } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.single();

	const { data: habits } = await supabase
		.from("habits")
		.select("*")
		.order("created_at", { ascending: false })
		.eq("user_id", user.id);

	if (!habits) return null;

	return (
		<main className="max-w-7xl mx-auto px-4 py-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Profile</h1>
				<p className="text-muted-foreground">
					Manage your personal information and view your habit journey.
				</p>
			</div>

			<div className="grid lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<ProfileOverview profile={profile} />
					<StatsOverview habits={habits} />
				</div>

				<div className="lg:col-span-2 space-y-6">
					<ProfileForm profile={profile} />
				</div>
			</div>
		</main>
	);
}
