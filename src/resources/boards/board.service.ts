import { boardRepo } from './board.memory.repository.js';

export const boardService = {
  getAll: () => boardRepo.getAll(),
  create: (info) => boardRepo.create(info),
  getById: (id) => boardRepo.getById(id),
  delete: (id) => boardRepo.delete(id),
  update: (id, board) => boardRepo.update(id, board),
};
