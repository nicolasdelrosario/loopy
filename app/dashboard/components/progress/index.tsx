import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Habit } from "@/schemas/habit";

export default function Progress({ habits }: { habits: Habit[] }) {
	const totalHabits = habits.length;
	const completedHabits = habits.filter((habit) => habit.is_completed);
	const successRate =
		totalHabits === 0 ? 0 : (completedHabits.length / totalHabits) * 100;
	const progress = successRate;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-foreground">
					<Calendar className="h-5 w-5 text-muted-foreground" />
					Your Progress
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<div className="flex justify-between text-sm mb-2">
							<span className="text-muted-foreground">Completed</span>
							<span className="text-foreground font-medium">
								{" "}
								{completedHabits.length}/{totalHabits}
							</span>
						</div>

						<ProgressBar className="h-2.5" value={progress} />
					</div>

					<div className="flex justify-between text-sm pt-2">
						<span className="text-muted-foreground">Success Rate</span>
						<span className="font-medium text-foreground">
							{successRate.toFixed(0)}%
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
