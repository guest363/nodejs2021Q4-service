import { usersService } from '../user.service';

/**
 * Endpoint для получения всех пользователей
 *
 * @returns массив всех пользователей
 */
export const get = async () => {
  const user = await usersService.getAll();
  return user;
};
