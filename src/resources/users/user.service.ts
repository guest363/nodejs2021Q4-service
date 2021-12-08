import { userSetT } from './types';
import { usersRepo } from './user.memory.repository';

export const usersService = {
  getAll: () => usersRepo.getAll(),
  create: (info: userSetT) => usersRepo.create(info),
  getById: (id: string) => usersRepo.getById(id),
  delete: (id: string) => usersRepo.delete(id),
  update: (id: string, user: userSetT) => usersRepo.update(id, user),
};
