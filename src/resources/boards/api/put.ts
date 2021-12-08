import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';

export const put = async (request: FastifyRequest, reply: FastifyReply) => {
  const updateBoard = await boardService.update(
    request.params.boardId,
    request.body
  );
  await reply.code(200).send(updateBoard);
};
