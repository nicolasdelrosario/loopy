import { Habit } from "@/schemas/habit";

import { Profile } from "@/schemas/profile";
import HabitCard from "../habit-card";

type Props = {
	habits: Habit[];
	profile: Profile;
};

export default function Habits({ habits, profile }: Props) {
	return (
		<div className="space-y-4">
			{habits.map((habit) => (
				<HabitCard habit={habit} key={habit.id} profile={profile} />
			))}
		</div>
	);
}
