import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = request.params as { boardId: string };

  const board = await boardService.getById(boardId);

  if (!board) {
    await reply.code(404).send();
  } else {
    await reply.code(200).send(board);
  }
};
