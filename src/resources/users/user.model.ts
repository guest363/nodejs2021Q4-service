import { v4 } from 'uuid';

export class User {
  id: string = v4();

  name: string;

  login: string;

  password: string;

  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
