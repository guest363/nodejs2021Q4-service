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
export class User {
  id!: string;

  name!: string;

  login!: string;

  password!: string;

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
