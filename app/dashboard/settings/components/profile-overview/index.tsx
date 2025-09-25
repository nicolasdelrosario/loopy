"use client";

import { format } from "@formkit/tempo";
import { Calendar, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "@/schemas/profile";
import { createClient } from "@/utils/supabase/client";

type ProfileOverviewProps = {
	profile: Profile;
};

export default function ProfileOverview({ profile }: ProfileOverviewProps) {
	const [avatarPreview, setAvatarPreview] = useState<string | null>(
		profile?.avatar_url || null,
	);
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;

		if (!file.type.startsWith("image/")) {
			return toast.error("Please select a valid image file.");
		}

		if (file.size > 2 * 1024 * 1024) {
			return toast.error("File size must be less than 2MB.");
		}

		setIsUploading(true);

		const supabase = createClient();

		try {
			const ext = file.name.split(".").pop();
			const fileName = `${profile.id}-${Date.now()}.${ext}`;
			const path = `avatars/${profile.id}/${fileName}`;

			if (profile.avatar_url) {
				const urlParts = profile.avatar_url.split("/");
				const fileName = urlParts[urlParts.length - 1];
				const userId = urlParts[urlParts.length - 2];

				if (userId === profile.id) {
					const oldPath = `${userId}/${fileName}`;
					await supabase.storage.from("avatars").remove([oldPath]);
				}
			}

			const { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(path, file, {
					cacheControl: "3600",
					upsert: false,
				});

			if (uploadError) throw uploadError;

			const { data: publicData } = supabase.storage
				.from("avatars")
				.getPublicUrl(path);

			const publicUrl = publicData.publicUrl;

			const { error: dbError } = await supabase
				.from("profiles")
				.update({ avatar_url: publicUrl })
				.eq("id", profile.id);

			if (dbError) throw dbError;

			setAvatarPreview(publicUrl);
			toast.success("Profile photo updated successfully.", {
				description: "Your new photo has been saved.",
			});

			router.refresh();
		} catch (error) {
			toast.error("Could not upload photo. Please try again.");
		} finally {
			setIsUploading(false);

			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	const getInitials = () => {
		const firstName = profile?.first_name?.charAt(0) || "";
		const lastName = profile?.last_name?.charAt(0) || "";
		return firstName + lastName;
	};

	return (
		<Card>
			<CardContent className="p-6 text-center">
				<div className="flex flex-col items-center space-y-4">
					<Avatar className="h-24 w-24 ring-2 ring-border">
						<AvatarImage
							alt="Profile picture"
							src={avatarPreview || undefined}
						/>
						<AvatarFallback className="bg-muted text-muted-foreground text-xl">
							{getInitials()}
						</AvatarFallback>
					</Avatar>

					<div className="space-y-1">
						<h2 className="text-xl font-semibold text-foreground">
							{profile.first_name} {profile.last_name}
						</h2>
						<p className="text-sm text-muted-foreground">{profile?.email}</p>
						{profile?.created_at && (
							<p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
								<Calendar className="h-3 w-3" />
								Joined {format(profile.created_at, { date: "short" })}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<input
							accept="image/*"
							className="hidden"
							onChange={handleAvatarChange}
							ref={fileInputRef}
							type="file"
						/>
						<Button
							disabled={isUploading}
							onClick={handleUploadClick}
							size="sm"
							type="button"
							variant="default"
						>
							<Upload className="h-4 w-4 mr-2" />
							{isUploading ? "Uploading..." : "Change Photo"}
						</Button>
						<p className="text-xs text-muted-foreground">
							Recommended: JPG or PNG, max 2MB.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
