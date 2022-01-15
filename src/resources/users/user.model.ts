import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

type userConstructorT = {
  id?: string;
  name: string;
  login: string;
  password: string;
};

/**
 * Класс Пользователь
 */
@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: userConstructorT) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
