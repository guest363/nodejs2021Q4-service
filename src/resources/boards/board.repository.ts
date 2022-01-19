import { getRepository } from 'typeorm';
import { BoardEntity } from './../../entitys/board';
import { Board } from './board.model';
import { boardSetT } from './types';

export const boardRepo = {
  /**
   * Возвращает список всех досок
   *
   * @returns список всех досок
   */
  getAll: async (): Promise<Board[]> => await getRepository(BoardEntity).find(),
  /**
   * Создает и возвращает новую доску
   *
   * @param info - данные для создания новой доски
   * @returns созданная доска
   */
  create: async (info: boardSetT): Promise<Board> => {
    const board = new Board(info);

    await getRepository(BoardEntity).save(board);

    return board;
  },
  /**
   * Возвращает доску по ID
   *
   * @param id - ID запрашиваемой доски
   * @returns полученная по ID доска
   */
  getById: async (id: string): Promise<Board | void> =>
    await getRepository(BoardEntity).findOne(id),
  /**
   * Удаляет доску по ID
   *
   * @param id- ID удаляемой доски
   * @returns true в случае успеха удаления и ошибка в случае неудачи
   */
  delete: async (id: string): Promise<boolean | Error> => {
    const result = await getRepository(BoardEntity).delete(id);

    return result.affected === 0 ? false : true;
  },
  /**
   * Обновляет доску по ID
   *
   * @param id - ID доски для обновления
   * @param user - новые данные доски
   * @returns обновленная доска
   */
  update: async (id: string, board: boardSetT): Promise<Board | Error> => {
    const updatedBoard = await getRepository(BoardEntity).findOne(id);

    if (updatedBoard) {
      await getRepository(BoardEntity).save({
        ...updatedBoard,
        ...board,
      });
    }

    return { id: id, ...board };
  },
};
