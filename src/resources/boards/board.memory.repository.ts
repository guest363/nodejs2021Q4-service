import { Board } from './board.model';
import { boardSetT } from './types';

const inMemoryDb = new Map() as Map<string, Board>;

export const boardRepo = {
  getAll: async (): Promise<Board[]> =>
    new Promise((resolve) => {
      resolve([...inMemoryDb.values()]);
    }),
  create: async (info: boardSetT): Promise<Board> =>
    new Promise((resolve) => {
      const board = new Board(info);
      inMemoryDb.set(board.id, board);
      resolve(board);
    }),
  getById: async (id: string): Promise<Board | void> =>
    new Promise((resolve) => {
      resolve(inMemoryDb.get(id) as Board | void);
    }),
  delete: async (id: string): Promise<boolean | Error> =>
    new Promise((resolve, reject) => {
      if (!inMemoryDb.has(id)) {
        reject(new Error('deleted board not found'));
      }
      inMemoryDb.delete(id);
      resolve(true);
    }),
  update: async (id: string, board: boardSetT): Promise<Board | Error> =>
    new Promise((resolve, reject) => {
      const oldBoard = inMemoryDb.get(id);
      if (!oldBoard) {
        reject(new Error('updated board not found'));
      }
      const updateBoard = { ...(oldBoard as Board), ...board };
      inMemoryDb.set(id, updateBoard);
      resolve(updateBoard);
    }),
};
