import { SignInSchema } from "@/schemas/auth/signInSchema";
import { AuthService } from "@/services/authService";

export class SignInUseCase {
	constructor(private service: AuthService) {}

	async run(data: SignInSchema) {
		return await this.service.signIn(data);
	}
}
