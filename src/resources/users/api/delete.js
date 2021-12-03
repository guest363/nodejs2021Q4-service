import { usersService } from '../user.service.js';

export const getById = async (request, reply) => {
  const { userId } = request.params;
  const isUserExist = usersService.has(userId);
  if (!isUserExist) {
    reply.code(404);
    reply.send();
  } else {
    await usersService.delete(userId);
    reply.code(204);
    reply.send();
  }
};
