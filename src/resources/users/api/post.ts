import { usersService } from '../user.service.js';

export const post = async (request, reply) => {
  const createUser = await usersService.create(request.body);
  reply.code(201);
  reply.send(createUser);
};
