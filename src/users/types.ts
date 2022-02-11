import { User } from './models/user.model';

export type UserGetT = Pick<User, 'id' | 'login' | 'name'>;

export type UserSetT = Pick<User, 'password' | 'login' | 'name'>;
