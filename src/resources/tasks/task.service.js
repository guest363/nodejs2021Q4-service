import { taskRepo } from './task.memory.repository.js';

export const taskService = {
  getAll: (props) => taskRepo.getAll(props),
  create: (props) => taskRepo.create(props),
  getById: (props) => taskRepo.getById(props),
  delete: (props) => taskRepo.delete(props),
  update: (props) => taskRepo.update(props),
};
