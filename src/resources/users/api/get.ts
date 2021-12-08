import { usersService } from '../user.service';

export const get = async () => {
  const user = await usersService.getAll();
  return user;
};
