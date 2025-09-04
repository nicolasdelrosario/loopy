import { SignUpSchema } from "@/schemas/auth/signUpSchema";
import { AuthService } from "@/services/authService";

export class SignUpUseCase {
	constructor(private service: AuthService) {}

	async run(data: SignUpSchema) {
		return await this.service.signUp(data);
	}
}
