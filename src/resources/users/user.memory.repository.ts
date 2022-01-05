import { userSetT } from './types';
import { User } from './user.model';

const inMemoryDb = new Map() as Map<string, User>;

export const usersRepo = {
  /**
   * Возвращает список всех пользователей
   *
   * @returns список всех пользователей
   */
  getAll: async (): Promise<User[]> =>
    new Promise((resolve) => {
      const usersFromDb = [...inMemoryDb.values()];
      resolve(usersFromDb);
    }),
  /**
   * Создает и возвращает нового пользователя
   *
   * @param info - данные для создания нового пользователя
   * @returns созданный пользователь
   */
  create: async (info: userSetT): Promise<User> =>
    new Promise((resolve) => {
      const user = new User(info);
      inMemoryDb.set(user.id, user);
      resolve(user);
    }),
  /**
   * Возвращает пользователя по ID
   *
   * @param id - ID запрашиваемого пользователся
   * @returns полученный по ID пользователь
   */
  getById: async (id: string): Promise<User | void> =>
    new Promise((resolve) => {
      const user = inMemoryDb.get(id);
      resolve(user);
    }),
  /**
   * Удаляет пользователя по ID
   *
   * @param id- ID удаляемого пользователся
   * @returns true в случае успеха удаления и ошибка в случае неудачи
   */
  delete: async (id: string): Promise<boolean | Error> =>
    new Promise((resolve, reject) => {
      if (!inMemoryDb.has(id)) {
        reject(new Error('deleted user not found'));
      }
      inMemoryDb.delete(id);
      resolve(true);
    }),
  /**
   * Обновляет пользователя по ID
   *
   * @param id - ID пользователся для обновления
   * @param user - новые данные пользователя
   * @returns обновленный пользователь
   */
  update: async (id: string, user: userSetT): Promise<User | Error> =>
    new Promise((resolve, reject) => {
      const oldUser = inMemoryDb.get(id);
      if (!oldUser) {
        reject(new Error('updated user not found'));
      }
      const newUser = { ...(oldUser as User), ...user };
      inMemoryDb.set(id, newUser);
      resolve(newUser);
    }),
};
