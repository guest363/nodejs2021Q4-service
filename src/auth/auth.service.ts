import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { verify } from './verify';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isCurrentPass = await verify(String(user?.password), pass);
    
    if (user && isCurrentPass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
