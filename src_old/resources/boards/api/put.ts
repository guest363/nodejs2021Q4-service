import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';
import { BoardSetT } from '../../../../src/boards/types';

/**
 * Endpoint для обновления доски
 * через reply.send возвращает обновленную доску и код 200
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
export const put = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = request.params as { boardId: string };

  /**
   * В типе body мы уверены за счет схемы putSchema которая валидирует JSON
   */
  const updateBoard = await boardService.update(
    boardId,
    request.body as BoardSetT
  );
  await reply.code(200).send(updateBoard);
};
