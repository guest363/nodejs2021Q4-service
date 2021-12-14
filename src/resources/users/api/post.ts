import { FastifyReply, FastifyRequest } from 'fastify';
import { userSetT } from '../types';
import { usersService } from '../user.service';

/**
 * Endpoint для создания пользователя
 * через reply.send возвращает созданного пользователяи код 201
 * 
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
export const post = async (request: FastifyRequest, reply: FastifyReply) => {
  /**
   * В типе body мы уверены за счет схемы postSchema которая валидирует JSON
   */
  const createUser = await usersService.create(request.body as userSetT);
  await reply.code(201).send(createUser);
};
