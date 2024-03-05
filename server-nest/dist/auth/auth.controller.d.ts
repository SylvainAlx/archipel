import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(req: any, res: any): Promise<void>;
    login(req: any, res: any): Promise<void>;
    forgetPassword(req: any, res: any): Promise<void>;
    verify(req: any, res: any): Promise<void>;
}
