import type { Metadata } from "next";

import { env } from "@/config/env";

type Props = {
	title?: string;
	description?: string;
	image?: string;
	icons?: string;
};

export const constructMetadata = ({
	title = env.NEXT_PUBLIC_APP_NAME,
	description = env.NEXT_PUBLIC_APP_DESCRIPTION,
	image = "/favicon.ico",
	icons = "/favicon.ico",
}: Props): Metadata => {
	return {
		description,
		icons,
		metadataBase: env.NEXT_PUBLIC_APP_URL
			? new URL(env.NEXT_PUBLIC_APP_URL)
			: undefined,
		openGraph: {
			description,
			images: [{ url: image }],
			locale: "es-PE",
			title,
		},
		title,
	};
};
