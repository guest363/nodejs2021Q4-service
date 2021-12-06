import { usersService } from '../user.service';

export const put = async (request, reply) => {
  const updateUser = await usersService.update(
    request.params.userId,
    request.body,
  );
  reply.code(200);
  reply.send(updateUser);
};
