import { ResetPasswordSchema } from "@/schemas/auth/resetPasswordSchema";
import { AuthService } from "@/services/authService";

export class ResetPasswordUseCase {
	constructor(private service: AuthService) {}

	async run(data: ResetPasswordSchema) {
		return await this.service.resetPassword(data);
	}
}
