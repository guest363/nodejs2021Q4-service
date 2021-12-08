import { FastifyReply, FastifyRequest } from 'fastify';
import { userSetT } from '../types';
import { usersService } from '../user.service';

export const put = async (request: FastifyRequest, reply: FastifyReply) => {
  /**
   * В типе body мы уверены за счет схемы putSchema которая валидирует JSON
   * За счет нее мы и уверены что в userId будет корректный UUID
   */
  const updateUser = await usersService.update(
    (request.params as { userId: string }).userId,
    request.body as userSetT
  );
  await reply.code(200).send(updateUser);
};
