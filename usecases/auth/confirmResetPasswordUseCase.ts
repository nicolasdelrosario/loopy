import { ConfirmResetPasswordSchema } from "@/schemas/auth/confirmResetPasswordSchema";
import { AuthService } from "@/services/authService";

export class ConfirmResetPasswordUseCase {
	constructor(private service: AuthService) {}

	async run(data: ConfirmResetPasswordSchema) {
		return await this.service.confirmResetPassword(data);
	}
}
