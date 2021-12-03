import { usersService } from '../user.service.js';

export const getById = async (request, reply) => {
  await usersService.delete(request.params.uuid);
  reply.code(204);
  reply.send();
};
