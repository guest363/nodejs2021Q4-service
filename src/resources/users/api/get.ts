import { usersService } from '../user.service';

export const get = async (request, reply) => {
  const user = await usersService.getAll();
  reply.send(user);
};
