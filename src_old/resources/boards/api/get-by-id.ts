import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';

/**
 * Endpoint для получения доски по ID
 *
 * - возвращает доску в случае успеха и код 200
 * - в случае ее отсутствия возвращает код 404
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = request.params as { boardId: string };

  const board = await boardService.getById(boardId);

  if (!board) {
    await reply.code(404).send();
  } else {
    await reply.code(200).send(board);
  }
};
