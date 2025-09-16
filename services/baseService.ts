import { createClient } from "@/utils/supabase/client";

export abstract class BaseService {
	protected supabase = createClient();

	protected async getAuthenticatedUser() {
		const {
			data: { user },
			error,
		} = await this.supabase.auth.getUser();

		if (error) throw new Error(error.message);
		if (!user) throw new Error("No authenticated user found");

		return user;
	}

	protected handleError(error: unknown) {
		if (error) {
			if (error instanceof Error) throw error;
			throw new Error(String(error));
		}
	}
}
