import { Exclude } from 'class-transformer';

/**
 * Класс Пользователь
 */
export class User {
  id!: string;
  name!: string;
  login!: string;

  @Exclude()
  password!: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
