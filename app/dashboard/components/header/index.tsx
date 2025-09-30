import { BarChart3, Bell, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
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

	const signOut = async () => {
		"use server";

		const supabase = await createClient();
		await supabase.auth.signOut();

		redirect("/");
	};

	return (
		<header className="border-b border-border bg-gradient-to-r from-background via-background/95 to-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<Logo size="md" withLink />

				<div className="flex items-center gap-4">
					{/* Desktop nav */}
					<nav className="hidden md:flex items-center gap-6">
						<Link
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							href="/dashboard/home"
						>
							Home
						</Link>
						{/* <Link
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							href="/dashboard/progress"
						>
							Progress
						</Link> */}
						<Link
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							href="/dashboard/settings"
						>
							Settings
						</Link>
					</nav>

					<div className="flex items-center gap-3">
						{/* Notifications
						<Button
							className="text-muted-foreground hover:text-foreground"
							size="icon"
							variant="ghost"
						>
							<Bell className="size-5" />
						</Button> */}

						{/* Theme Toggle */}
						<ThemeToggle />

						{/* User Menu */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className="relative h-10 w-10 rounded-full cursor-pointer"
									variant="ghost"
								>
									<Avatar className="h-10 w-10">
										<AvatarImage alt="profile" src={profile?.avatar_url} />
										<AvatarFallback className="bg-muted text-muted-foreground">
											{profile?.first_name?.charAt(0)}
											{profile?.last_name?.charAt(0)}
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none text-foreground">
											{profile?.first_name} {profile?.last_name}
										</p>
										<p className="text-xs leading-none text-muted-foreground">
											{profile?.email}
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{/* <DropdownMenuItem asChild>
									<Link className="cursor-pointer" href="/dashboard/progress">
										<BarChart3 className="mr-2 size-4" />
										<span>Progress</span>
									</Link>
								</DropdownMenuItem> */}
								<DropdownMenuItem asChild>
									<Link
										className="cursor-pointer"
										href="/dashboard/settings/profile"
									>
										<User className="mr-2 size-4" />
										<span>Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link className="cursor-pointer" href="/dashboard/settings">
										<Settings className="mr-2 size-4" />
										<span>Settings</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<form action={signOut}>
										<button
											className="flex w-full items-center cursor-pointer gap-2"
											type="submit"
										>
											<LogOut className="mr-2 size-4" />
											<span>Log out</span>
										</button>
									</form>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
