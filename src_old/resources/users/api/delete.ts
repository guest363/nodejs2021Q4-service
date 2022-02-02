import { FastifyReply, FastifyRequest } from 'fastify';
import { usersService } from '../user.service';

/**
 * Endpoint для удаления пользователя по ID.
 *
 * При этом для всех задач пользователя userId ставится в null
 *
 * - статус код 204 в случае успеха
 * - в случае его отсутствия возвращает код 404
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
export const deleteById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  /**
   * За счет getByIdSchema мы и уверены что в userId будет корректный UUID
   */
  const { userId } = request.params as { userId: string };

  if ((await usersService.delete(userId)) instanceof Error) {
    await reply.code(404).send();
  }

  await reply.code(204).send();
};