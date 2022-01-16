import { connection } from '../../variables';
import { Board } from './board.model';
import { boardSetT } from './types';

export const boardRepo = {
  /**
   * Возвращает список всех досок
   *
   * @returns список всех досок
   */
  getAll: async (): Promise<Board[]> =>
    await connection.getRepository(Board).createQueryBuilder('board').getMany(),
  /**
   * Создает и возвращает новую доску
   *
   * @param info - данные для создания новой доски
   * @returns созданная доска
   */
  create: async (info: boardSetT): Promise<Board> => {
    const board = new Board(info);
    await connection
      .getRepository(Board)
      .createQueryBuilder('board')
      .insert()
      .into(Board)
      .values(board)
      .execute();

    return board;
  },
  /**
   * Возвращает доску по ID
   *
   * @param id - ID запрашиваемой доски
   * @returns полученная по ID доска
   */
  getById: async (id: string): Promise<Board | void> =>
    await connection
      .getRepository(Board)
      .createQueryBuilder('board')
      .where('board.id = :id', { id: id })
      .getOne(),
  /**
   * Удаляет доску по ID
   *
   * @param id- ID удаляемой доски
   * @returns true в случае успеха удаления и ошибка в случае неудачи
   */
  delete: async (id: string): Promise<boolean | Error> => {
    await connection
      .getRepository(Board)
      .createQueryBuilder('board')
      .delete()
      .from(Board)
      .where('board.id = :id', { id: id })
      .execute();
    return true;
  },
  /**
   * Обновляет доску по ID
   *
   * @param id - ID доски для обновления
   * @param user - новые данные доски
   * @returns обновленная доска
   */
  update: async (id: string, board: boardSetT): Promise<Board | Error> => {
    await connection
      .getRepository(Board)
      .createQueryBuilder('board')
      .update(Board)
      .set(board)
      .where('board.id = :id', { id: id })
      .execute();

    return { id: id, ...board };
  },
};
