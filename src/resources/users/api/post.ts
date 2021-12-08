import { FastifyReply, FastifyRequest } from 'fastify';
import { userSetT } from '../types';
import { usersService } from '../user.service';

export const post = async (request: FastifyRequest, reply: FastifyReply) => {
  /**
   * В типе body мы уверены за счет схемы postSchema которая валидирует JSON
   */
  const createUser = await usersService.create(request.body as userSetT);
  await reply.code(201).send(createUser);
};
