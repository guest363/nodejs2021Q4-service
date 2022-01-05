import { FastifyReply, FastifyRequest } from 'fastify';
import { usersService } from '../user.service';

/**
 * Endpoint для получения пользователя по ID
 *
 * - возвращает пользователя в случае успеха и код 200
 * - в случае его отсутствия возвращает код 404
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
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
