import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';

/**
 * Endpoint для получения всех досок
 * 
 * @param _request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 * @returns массив всех досок
 */
export const get = async (_request: FastifyRequest, reply: FastifyReply) => {
  const boards = await boardService.getAll();

  await reply.send(boards);
};
