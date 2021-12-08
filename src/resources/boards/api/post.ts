import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';

export const post = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBoard = await boardService.create(request.body);

  await reply.code(201).send(createBoard);
};
