import { usersService } from '../user.service.js';

export const getById = async (request, reply) => {
  const users = await usersService.getById(request.params.userId);
  reply.code(200);
  reply.send(users);
};
