import { taskRepo } from './task.memory.repository.js';

export const taskService = {
  getAll: () => taskRepo.getAll(),
  create: (info) => taskRepo.create(info),
  getById: (id) => taskRepo.getById(id),
  delete: (id) => taskRepo.delete(id),
  update: (id, board) => taskRepo.update(id, board),
};
