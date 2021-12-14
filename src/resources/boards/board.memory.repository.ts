import { Board } from './board.model';
import { boardSetT } from './types';

const inMemoryDb = new Map() as Map<string, Board>;

export const boardRepo = {
  /**
   * Возвращает список всех досок
   *
   * @returns список всех досок
   */
  getAll: async (): Promise<Board[]> =>
    new Promise((resolve) => {
      resolve([...inMemoryDb.values()]);
    }),
  /**
   * Создает и возвращает новую доску
   *
   * @param info - данные для создания новой доски
   * @returns созданная доска
   */
  create: async (info: boardSetT): Promise<Board> =>
    new Promise((resolve) => {
      const board = new Board(info);
      inMemoryDb.set(board.id, board);
      resolve(board);
    }),
  /**
   * Возвращает доску по ID
   *
   * @param id - ID запрашиваемой доски
   * @returns полученная по ID доска
   */
  getById: async (id: string): Promise<Board | void> =>
    new Promise((resolve) => {
      resolve(inMemoryDb.get(id) as Board | void);
    }),
  /**
   * Удаляет доску по ID
   *
   * @param id- ID удаляемой доски
   * @returns true в случае успеха удаления и ошибка в случае неудачи
   */
  delete: async (id: string): Promise<boolean | Error> =>
    new Promise((resolve, reject) => {
      if (!inMemoryDb.has(id)) {
        reject(new Error('deleted board not found'));
      }
      inMemoryDb.delete(id);
      resolve(true);
    }),
  /**
   * Обновляет доску по ID
   *
   * @param id - ID доски для обновления
   * @param user - новые данные доски
   * @returns обновленная доска
   */
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
