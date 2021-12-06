import { usersService } from '../user.service.js';

export const get = async (request, reply) => {
  const user = await usersService.getAll();
  reply.send(user);
};
