import { usersRepo } from './user.memory.repository';

export const usersService = {
  getAll: () => usersRepo.getAll(),
  create: (info) => usersRepo.create(info),
  getById: (id) => usersRepo.getById(id),
  delete: (id) => usersRepo.delete(id),
  update: (id, user) => usersRepo.update(id, user),
};
