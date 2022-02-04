import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { hash } from '../../auth/hash';

/**
 * Класс Пользователь
 */
export class User {
  id!: string;
  name!: string;
  login!: string;

  @Exclude()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // conditional to detect if password has changed goes here
    this.password = await hash(String(this.password));
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
