import { boardRepo } from './board.repository';
import { BoardSetT } from '../../../src/boards/types';

export const boardService = {
  /**
   * Возвращает список всех досок
   *
   * @returns список всех досок
   */
  getAll: () => boardRepo.getAll(),
  /**
   * Создает и возвращает новую доску
   *
   * @param info - данные для создания новой доски
   * @returns созданная доска
   */
  create: (info: BoardSetT) => boardRepo.create(info),
  /**
   * Возвращает доску по ID
   *
   * @param id - ID запрашиваемой доски
   * @returns полученная по ID доска
   */
  getById: (id: string) => boardRepo.getById(id),
  /**
   * Удаляет доску по ID
   *
   * @param id- ID удаляемой доски
   * @returns true в случае успеха удаления и ошибка в случае неудачи
   */
  delete: (id: string) => boardRepo.delete(id),
  /**
   * Обновляет доску по ID
   *
   * @param id - ID доски для обновления
   * @param user - новые данные доски
   * @returns обновленная доска
   */
  update: (id: string, board: BoardSetT) => boardRepo.update(id, board),
};
