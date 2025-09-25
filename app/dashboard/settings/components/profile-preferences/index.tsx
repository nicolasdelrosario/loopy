"use client";

import { useTheme } from "next-themes";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function ProfilePreferences() {
	const { theme, setTheme } = useTheme();

	const isDark = theme === "dark";

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Appearance</CardTitle>
					<CardDescription>
						Customize how Loopy looks and feels.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Dark Mode</Label>
							<p className="text-sm text-muted-foreground">
								Switch between light and dark themes
							</p>
						</div>
						<Switch
							checked={isDark}
							onCheckedChange={(checked) =>
								setTheme(checked ? "dark" : "light")
							}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Language & Region</CardTitle>
					<CardDescription>
						Set your language and regional preferences.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a language" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Language</SelectLabel>
								<SelectItem value="en">English</SelectItem>
								<SelectItem value="es">Spanish</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>
		</>
	);
}
