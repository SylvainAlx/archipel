import { Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(req, res) {
    return this.authService.register(req.body);
  }

  @Post('login')
  async login(req, res) {
    return this.authService.login(req.body);
  }

  @Post('forgetpassword')
  async forgetPassword(req, res) {
    return this.authService.forgetPassword(req.body);
  }

  @Get('verify')
  async verify(req, res) {
    return this.authService.verify(req.query.token);
  }
}
