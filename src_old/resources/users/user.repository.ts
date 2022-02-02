import { getRepository } from 'typeorm';
import { UserEntity } from '../../../src/entitys/user';
import { userSetT } from './types';
import { User } from './user.model';

export const usersRepo = {
  /**
   * Возвращает список всех пользователей
   *
   * @returns список всех пользователей
   */
  getAll: async (): Promise<User[]> => {
    const result = await getRepository(UserEntity).find();
    return result;
  },
  /**
   * Создает и возвращает нового пользователя
   *
   * @param info - данные для создания нового пользователя
   * @returns созданный пользователь
   */
  create: async (info: userSetT): Promise<User> => {
    const user = new User(info);
    await getRepository(UserEntity).save(user);

    return user;
  },

  /**
   * Возвращает пользователя по ID
   *
   * @param id - ID запрашиваемого пользователся
   * @returns полученный по ID пользователь
   */
  getById: async (id: string): Promise<User | void> => {
    const result = await getRepository(UserEntity).findOne(id);
    return result;
  },
  /**
   * Удаляет пользователя по ID
   *
   * @param id- ID удаляемого пользователся
   * @returns true в случае успеха удаления и ошибка в случае неудачи
   */
  delete: async (id: string): Promise<boolean | Error> => {
    const result = await getRepository(UserEntity).delete(id);

    return result.affected !== 0;
  },
  /**
   * Обновляет пользователя по ID
   *
   * @param id - ID пользователся для обновления
   * @param user - новые данные пользователя
   * @returns обновленный пользователь
   */
  update: async (id: string, user: userSetT): Promise<User | Error> => {
    await getRepository(UserEntity).update(id, user);

    return { id, ...user };
  },
};