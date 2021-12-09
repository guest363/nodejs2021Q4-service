import { boardRepo } from './board.memory.repository';
import { boardSetT } from './types';

export const boardService = {
  getAll: () => boardRepo.getAll(),
  create: (info: boardSetT) => boardRepo.create(info),
  getById: (id: string) => boardRepo.getById(id),
  delete: (id: string) => boardRepo.delete(id),
  update: (id: string, board: boardSetT) => boardRepo.update(id, board),
};
