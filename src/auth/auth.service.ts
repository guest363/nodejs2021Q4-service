import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entitys/user';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { verify } from './verify';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.usersService.findOne(username);
    const isCurrentPass = await verify(String(user?.password), pass);

    if (user && isCurrentPass) {
      const { password, ...result } = user;
      return result as Omit<UserEntity, 'password'>;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userId: user.id, login: user.login };
    return {
      token: await this.jwtService.sign(payload),
    };
  }
}
