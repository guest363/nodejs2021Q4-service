import { FastifyReply, FastifyRequest } from 'fastify';
import { usersService } from '../user.service';

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  /**
   * За счет getByIdSchema мы и уверены что в userId будет корректный UUID
   */
  const users = await usersService.getById(
    (request.params as { userId: string }).userId
  );

  if (!users) {
    await reply.code(404).send();
  } else {
    await reply.code(200).send(users);
  }
};
