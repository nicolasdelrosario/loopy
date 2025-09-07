import { ConfirmResetPasswordSchema } from "@/schemas/auth/confirmResetPasswordSchema";
import { ResetPasswordSchema } from "@/schemas/auth/resetPasswordSchema";
import { SignInSchema } from "@/schemas/auth/signInSchema";
import { SignUpSchema } from "@/schemas/auth/signUpSchema";
import { createClient } from "@/utils/supabase/client";

export class AuthService {
	private supabase = createClient();

	async signUp(data: SignUpSchema) {
		const { error } = await this.supabase.auth.signUp({
			email: data.email,
			options: {
				data: {
					first_name: data.firstName,
					last_name: data.lastName,
					terms: data.terms,
				},
			},
			password: data.password,
		});

		if (error) throw new Error(error.message);
	}

	async signIn(data: SignInSchema) {
		const { error } = await this.supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) throw new Error(error.message);
	}

	async signOut() {
		const { error } = await this.supabase.auth.signOut();

		if (error) throw new Error(error.message);
	}

	async getCurrentUser() {
		const {
			data: { user },
			error,
		} = await this.supabase.auth.getUser();

		if (error) throw new Error(error.message);

		if (!user) throw new Error("No authenticated user found");

		return user;
	}

	async getCurrentSession() {
		const {
			data: { session },
			error,
		} = await this.supabase.auth.getSession();

		if (error) throw new Error(error.message);

		return session;
	}

	async confirmResetPassword(data: ConfirmResetPasswordSchema) {
		const { error } = await this.supabase.auth.resetPasswordForEmail(
			data.email,
			{
				// I will improve this later unu
				redirectTo: "http://localhost:3000/auth/reset-password",
			},
		);

		if (error) throw new Error(error.message);
	}

	async resetPassword(data: ResetPasswordSchema) {
		const { error } = await this.supabase.auth.updateUser({
			password: data.password,
		});

		if (error) throw new Error(error.message);
	}
}
