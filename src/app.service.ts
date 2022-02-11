import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { User } from './users/models/user.model';

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  getHello(): string {
    return 'Service is running!';
  }

  async login(user: User) {
    return await this.authService.login(user);
  }
}
