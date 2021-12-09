import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';
import { boardSetT } from '../types';

export const post = async (request: FastifyRequest, reply: FastifyReply) => {
  /**
   * В типе body мы уверены за счет схемы postSchema которая валидирует JSON
   */
  const createBoard = await boardService.create(request.body as boardSetT);

  await reply.code(201).send(createBoard);
};
