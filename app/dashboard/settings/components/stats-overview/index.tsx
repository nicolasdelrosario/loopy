import { format } from "@formkit/tempo";
import {
	Calendar,
	CheckCircle2,
	Flame,
	Target,
	TrendingUp,
	Upload,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@/schemas/profile";

type Props = {
	profile: Profile;
};

export default function StatsOverview({ profile }: Props) {
	// this is just an example

	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle>Your Stats</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col items-center p-3 rounded-lg border bg-zinc-50 dark:bg-muted">
						<Target className="h-5 w-5 text-muted-foreground mb-1" />
						<span className="text-sm text-muted-foreground">Total Habits</span>
						<span className="font-medium text-foreground">12</span>
					</div>

					<div className="flex flex-col items-center p-3 rounded-lg border bg-zinc-50 dark:bg-muted">
						<CheckCircle2 className="h-5 w-5 text-muted-foreground mb-1" />
						<span className="text-sm text-muted-foreground">
							Completed Today
						</span>
						<span className="font-medium text-foreground">3</span>
					</div>

					<div className="flex flex-col items-center p-3 rounded-lg border bg-zinc-50 dark:bg-muted">
						<Flame className="h-5 w-5 text-muted-foreground mb-1" />
						<span className="text-sm text-muted-foreground">
							Longest Streak
						</span>
						<span className="font-medium text-foreground">7 days</span>
					</div>

					<div className="flex flex-col items-center p-3 rounded-lg border bg-zinc-50 dark:bg-muted">
						<TrendingUp className="h-5 w-5 text-muted-foreground mb-1" />
						<span className="text-sm text-muted-foreground">Success Rate</span>
						<span className="font-medium text-foreground">85%</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
