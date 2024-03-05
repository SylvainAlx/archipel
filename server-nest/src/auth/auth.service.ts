import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register(body) {}
  login(body) {}
  forgetPassword(body) {}
  verify(token) {}
  getHello(): string {
    return 'Hello World!';
  }
}
