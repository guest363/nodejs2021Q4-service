import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';
import { boardSetT } from '../types';

/**
 * Endpoint для создания доски
 * через reply.send возвращает созданную доску с кодом 201
 * 
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */

export const post = async (request: FastifyRequest, reply: FastifyReply) => {
  /**
   * В типе body мы уверены за счет схемы postSchema которая валидирует JSON
   */
  const createBoard = await boardService.create(request.body as boardSetT);

  await reply.code(201).send(createBoard);
};
