import { userSetT } from './types';
import { usersRepo } from './user.memory.repository';

/**
 * Сервис для работы с пользователями
 */
export const usersService = {
  /**
   * Возвращает список всех пользователей
   *
   * @returns список всех пользователей
   */
  getAll: () => usersRepo.getAll(),
  /**
   * Создает и возвращает нового пользователя
   *
   * @param info - данные для создания нового пользователя
   * @returns созданный пользователь
   */
  create: (info: userSetT) => usersRepo.create(info),
  /**
   * Возвращает пользователя по ID
   *
   * @param id - ID запрашиваемого пользователся
   * @returns полученный по ID пользователь
   */
  getById: (id: string) => usersRepo.getById(id),
  /**
   * Удаляет пользователя по ID
   *
   * @param id- ID удаляемого пользователся
   * @returns true в случае успеха удаления и ошибка в случае неудачи
   */
  delete: (id: string) => usersRepo.delete(id),
  /**
   * Обновляет пользователя по ID
   *
   * @param id - ID пользователся для обновления
   * @param user - новые данные пользователя
   * @returns обновленный пользователь
   */
  update: (id: string, user: userSetT) => usersRepo.update(id, user),
};
