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
import { Habit } from "@/schemas/habit";

type Props = {
	habits: Habit[];
};
export default function StatsOverview({ habits }: Props) {
	const totalHabits = habits.length;
	const completedHabits = habits.filter((habit) => habit.is_completed);
	const successRate =
		totalHabits === 0 ? 0 : (completedHabits.length / totalHabits) * 100;

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
						<span className="font-medium text-foreground">{totalHabits}</span>
					</div>

					<div className="flex flex-col items-center p-3 rounded-lg border bg-zinc-50 dark:bg-muted">
						<CheckCircle2 className="h-5 w-5 text-muted-foreground mb-1" />
						<span className="text-sm text-muted-foreground">Completed</span>
						<span className="font-medium text-foreground">
							{completedHabits.length}
						</span>
					</div>

					<div className="flex flex-col items-center p-3 rounded-lg border bg-zinc-50 dark:bg-muted">
						<TrendingUp className="h-5 w-5 text-muted-foreground mb-1" />
						<span className="text-sm text-muted-foreground">Success Rate</span>
						<span className="font-medium text-foreground">
							{successRate.toFixed(0)}%
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
