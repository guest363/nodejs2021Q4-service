import { userSetT } from './types';
import { User } from './user.model';

const inMemoryDb = new Map() as Map<string, User>;

export const usersRepo = {
  getAll: async (): Promise<User[]> =>
    new Promise((resolve) => {
      const usersFromDb = [...inMemoryDb.values()];
      resolve(usersFromDb);
    }),
  create: async (info: userSetT): Promise<User> =>
    new Promise((resolve) => {
      const user = new User(info);
      inMemoryDb.set(user.id, user);
      resolve(user);
    }),
  getById: async (id: string): Promise<User | void> =>
    new Promise((resolve) => {
      const user = inMemoryDb.get(id);
      resolve(user);
    }),
  delete: async (id: string): Promise<boolean | Error> =>
    new Promise((resolve, reject) => {
      if (!inMemoryDb.has(id)) {
        reject(new Error('deleted user not found'));
      }
      inMemoryDb.delete(id);
      resolve(true);
    }),
  update: async (id: string, user: userSetT): Promise<User | Error> =>
    new Promise((resolve, reject) => {
      const oldUser = inMemoryDb.get(id);
      if (!oldUser) {
        reject(new Error('updated user not found'));
      }
      const newUser = { ...(oldUser as User), ...user };
      inMemoryDb.set(id, newUser);
      resolve(newUser);
    }),
};
