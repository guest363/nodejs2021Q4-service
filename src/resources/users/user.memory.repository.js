import { User } from './user.model.js';

const inMemoryDb = new Map();

export const usersRepo = {
  getAll: async () => [...inMemoryDb.values()],
  create: async (info) => {
    const user = new User(info);
    inMemoryDb.set(user.id, user);
    return user;
  },
  getById: async (id) => inMemoryDb.get(id),
  delete: async (id) => inMemoryDb.delete(id),
  update: async (id, user) => {
    const oldUser = inMemoryDb.get(id);
    const newUser = { ...oldUser, ...user };
    inMemoryDb.set(id, newUser);
    return newUser;
  },
};
