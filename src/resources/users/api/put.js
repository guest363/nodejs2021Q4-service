import { usersService } from '../user.service.js';

export const put = async (request, reply) => {
  const updateUser = await usersService.update(
    request.params.uuid,
    request.body
  );
  reply.code(200);
  reply.send(updateUser);
};
