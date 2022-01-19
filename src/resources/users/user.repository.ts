import typeorm from 'typeorm';
import { UserEntity } from './../../entitys/user';
import { userSetT } from './types';
import { User } from './user.model';

const { getRepository } = typeorm;

export const usersRepo = {
  /**
   * Возвращает список всех пользователей
   *
   * @returns список всех пользователей
   */
  getAll: async (): Promise<User[]> =>
    await getRepository(UserEntity).createQueryBuilder('user').getMany(),
  /**
   * Создает и возвращает нового пользователя
   *
   * @param info - данные для создания нового пользователя
   * @returns созданный пользователь
   */
  create: async (info: userSetT): Promise<User> => {
    const user = new User(info);
    await getRepository(UserEntity)
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values(user)
      .execute();

    return user;
  },

  /**
   * Возвращает пользователя по ID
   *
   * @param id - ID запрашиваемого пользователся
   * @returns полученный по ID пользователь
   */
  getById: async (id: string): Promise<User | void> =>
    await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne(),
  /**
   * Удаляет пользователя по ID
   *
   * @param id- ID удаляемого пользователся
   * @returns true в случае успеха удаления и ошибка в случае неудачи
   */
  delete: async (id: string): Promise<boolean | Error> => {
    await getRepository(UserEntity)
      .createQueryBuilder('user')
      .delete()
      .from(User)
      .where('user.id = :id', { id: id })
      .execute();
    return true;
  },
  /**
   * Обновляет пользователя по ID
   *
   * @param id - ID пользователся для обновления
   * @param user - новые данные пользователя
   * @returns обновленный пользователь
   */
  update: async (id: string, user: userSetT): Promise<User | Error> => {
    await getRepository(UserEntity)
      .createQueryBuilder('user')
      .update(User)
      .set(user)
      .where('board.id = :id', { id: id })
      .execute();

    return { id: id, ...user };
  },
};
