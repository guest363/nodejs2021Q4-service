import { usersService } from '../user.service.js';

export const get = async (request, reply) => {
  const users = await usersService.getAll();
  reply.send(users);
};
