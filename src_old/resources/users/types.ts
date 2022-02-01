import { User } from './user.model';

export type userGetT = Pick<User, 'id' | 'login' | 'name'>;

export type userSetT = Pick<User, 'password' | 'login' | 'name'>;
