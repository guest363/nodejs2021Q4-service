import { Board } from './board.model';

const inMemoryDb = new Map();

export const boardRepo = {
  getAll: async () => [...inMemoryDb.values()],
  create: async (info) => {
    const board = new Board(info);
    inMemoryDb.set(board.id, board);
    return board;
  },
  getById: async (id) => inMemoryDb.get(id),
  delete: async (id) => inMemoryDb.delete(id),
  update: async (id, board) => {
    const oldBoard = inMemoryDb.get(id);
    const newBoard = { ...oldBoard, ...board };
    inMemoryDb.set(id, newBoard);
    return newBoard;
  },
};
