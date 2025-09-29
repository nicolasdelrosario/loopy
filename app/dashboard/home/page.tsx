import AddHabit from "@/app/dashboard/components/add-habit";
import Habits from "@/app/dashboard/components/habits";
import Progress from "@/app/dashboard/components/progress";
import StatsOverview from "@/app/dashboard/components/stats-overview";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
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
				<h1 className="text-3xl font-bold">
					Good morning, {profile?.first_name}!
				</h1>
				<p className="text-muted-foreground">
					Let's make today count. You have {habits.length} habits left to
					complete.
				</p>
			</div>

			<section className="max-w-7xl mx-auto py-4">
				<StatsOverview habits={habits} />
			</section>

			<section className="max-w-7xl mx-auto py-4">
				<div className="grid lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold">Your Habits</h2>

							<AddHabit profile={profile} />
						</div>

						{habits.length > 0 ? (
							<Habits habits={habits} profile={profile} />
						) : (
							<p className="text-muted-foreground">
								You have no habits yet. Add a new one to get started!
							</p>
						)}
					</div>

					<div className="lg:col-span-1 space-y-6">
						<Progress habits={habits} />
					</div>
				</div>
			</section>
		</main>
	);
}
