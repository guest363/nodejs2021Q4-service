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

  /**
   * If the user exists and the password is correct, return the user. Otherwise, return null
   * @param {string} username - The username of the user.
   * @param {string} pass - string
   * @returns The user entity without the password field.
   */
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

  /**
   * It takes a user object and returns a token
   * @param {User} user - User
   * @returns The token is being returned.
   */
  async login(user: User) {
    const payload = { password: user.password, login: user.login };
    return {
      token: await this.jwtService.sign(payload),
    };
  }
}
