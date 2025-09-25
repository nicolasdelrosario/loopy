import { Lock } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function ProfileSecurity() {
	return (
		<Card className="p-8 text-center">
			<Lock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
			<CardTitle>Security settings are coming soon</CardTitle>
			<CardDescription>
				You’ll be able to manage your password, sessions, and 2FA here.
			</CardDescription>
		</Card>
	);
}
