import { ConfirmResetPasswordSchema } from "@/schemas/auth/confirmResetPasswordSchema";
import { ResetPasswordSchema } from "@/schemas/auth/resetPasswordSchema";
import { SignInSchema } from "@/schemas/auth/signInSchema";
import { SignUpSchema } from "@/schemas/auth/signUpSchema";
import { BaseService } from "@/services/baseService";

export class AuthService extends BaseService {
	async signUp(data: SignUpSchema) {
		const { data: result, error } = await this.supabase.auth.signUp({
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

		this.handleError(error);
		return result;
	}

	async signIn(data: SignInSchema) {
		const { data: result, error } = await this.supabase.auth.signInWithPassword(
			{
				email: data.email,
				password: data.password,
			},
		);

		this.handleError(error);
		return result;
	}

	async signInWithLinkedIn() {
		const { data, error } = await this.supabase.auth.signInWithOAuth({
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
				scopes: "openid profile email",
			},
			provider: "linkedin_oidc",
		});

		this.handleError(error);
		return data;
	}

	async signOut() {
		const { error } = await this.supabase.auth.signOut();
		this.handleError(error);
	}

	async getCurrentUser() {
		const {
			data: { user },
			error,
		} = await this.supabase.auth.getUser();

		this.handleError(error);
		if (!user) throw new Error("No authenticated user found");

		return user;
	}

	async getCurrentSession() {
		const {
			data: { session },
			error,
		} = await this.supabase.auth.getSession();

		this.handleError(error);
		return session;
	}

	async confirmResetPassword(data: ConfirmResetPasswordSchema) {
		const { error } = await this.supabase.auth.resetPasswordForEmail(
			data.email,
			{
				redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
			},
		);

		this.handleError(error);
	}

	async resetPassword(data: ResetPasswordSchema) {
		const { error } = await this.supabase.auth.updateUser({
			password: data.password,
		});

		this.handleError(error);
	}
}
