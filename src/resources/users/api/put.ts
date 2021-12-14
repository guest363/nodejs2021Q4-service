import { FastifyReply, FastifyRequest } from 'fastify';
import { userSetT } from '../types';
import { usersService } from '../user.service';

/**
 * Endpoint для обновления пользователя
 * через reply.send возвращает обновленного пользователя и код 200
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
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
