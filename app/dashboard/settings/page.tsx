import { SettingsIcon, Shield, User } from "lucide-react";
import ProfileForm from "@/app/dashboard/settings/components/profile-form";
import ProfilePreferences from "@/app/dashboard/settings/components/profile-preferences";
import ProfileSecurity from "@/app/dashboard/settings/components/profile-security";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

	return (
		<main className="max-w-7xl mx-auto px-4 py-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Settings</h1>
				<p className="text-muted-foreground">
					Manage your account settings and preferences.
				</p>
			</div>

			<Tabs className="space-y-6 w-full max-w-3xl" defaultValue="account">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger className="flex items-center gap-2" value="account">
						<User className="h-4 w-4" />
						Account
					</TabsTrigger>
					<TabsTrigger className="flex items-center gap-2" value="preferences">
						<SettingsIcon className="h-4 w-4" />
						Preferences
					</TabsTrigger>
					<TabsTrigger className="flex items-center gap-2" value="security">
						<Shield className="h-4 w-4" />
						Security
					</TabsTrigger>
				</TabsList>

				<TabsContent className="space-y-6" value="account">
					<ProfileForm profile={profile} />
				</TabsContent>

				<TabsContent className="space-y-6" value="preferences">
					<ProfilePreferences />
				</TabsContent>

				<TabsContent className="space-y-6" value="security">
					<ProfileSecurity />
				</TabsContent>
			</Tabs>
		</main>
	);
}
