import { usersService } from '../user.service.js';

export const getById = async (request, reply) => {
  const users = await usersService.getById(request.params.userId);

  if (!users) {
    reply.code(404);
    reply.send();
  } else {
    reply.code(200);
    reply.send(users);
  }
};
