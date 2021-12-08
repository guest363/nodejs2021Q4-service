import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';

export const get = async (_request: FastifyRequest, reply: FastifyReply) => {
  const boards = await boardService.getAll();

  await reply.send(boards);
};
