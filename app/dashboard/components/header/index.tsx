import {
	BarChart3,
	Bell,
	LogOut,
	Settings,
	User,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id) 
    .single();

	const signOut = async () => {
		"use server";

		const supabase = await createClient();
		await supabase.auth.signOut();

		redirect("/");
	};

	return (
		<header className="border-b border-zinc-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
				<Link className="flex items-center gap-2" href="/dashboard/home">
					<div className="w-8 h-8 bg-primary/96 rounded-full flex items-center justify-center">
						<div className="w-4 h-4 border-2 border-white rounded-full"></div>
					</div>
					<span className="text-xl font-bold ">Loopy</span>
				</Link>

				<div className="flex items-center gap-4">
					<nav className="hidden md:flex items-center gap-6">
						<Link href="/dashboard/home">Home</Link>
						<Link href="/dashboard/progress">Progress</Link>
						<Link href="/dashboard/settings">Settings</Link>
					</nav>

					<div className="flex items-center gap-4">
						{/* Working on it unu */}
						<Button
							className="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50"
							size="icon"
							variant="ghost"
						>
							<Bell className="size-5" />
						</Button>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className="relative h-10 w-10 rounded-full cursor-pointer"
									variant="ghost"
								>
									<Avatar className="h-10 w-10">
										<AvatarImage alt="profile" src={profile?.avatar_url} />
										<AvatarFallback className="bg-zinc-100 text-zinc-700">
											{profile?.first_name?.[0] + profile?.last_name?.[0]}
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">
											{profile?.first_name} {profile?.last_name}
										</p>
										<p className="text-xs leading-none text-muted-foreground">
											{profile?.email}
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link className="cursor-pointer" href="/dashboard/progress">
										<BarChart3 className="mr-2 size-4" />
										<span>Progress</span>
									</Link>
								</DropdownMenuItem>
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
