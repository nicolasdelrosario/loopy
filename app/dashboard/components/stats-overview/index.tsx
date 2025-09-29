import { CheckCircle2, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
			<Card>
				<CardContent className="p-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
							<Target className="h-5 w-5 text-muted-foreground" />
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">
								{totalHabits}
							</p>
							<p className="text-sm text-muted-foreground">Total Habits</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
							<CheckCircle2 className="h-5 w-5 text-muted-foreground" />
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">
								{completedHabits.length}
							</p>
							<p className="text-sm text-muted-foreground">Completed Today</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
							<TrendingUp className="h-5 w-5 text-muted-foreground" />
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">
								{successRate.toFixed(0)}%
							</p>
							<p className="text-sm text-muted-foreground">Success Rate</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
