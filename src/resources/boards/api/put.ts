import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../board.service';
import { boardSetT } from '../types';

export const put = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = request.params as { boardId: string };

  /**
   * В типе body мы уверены за счет схемы putSchema которая валидирует JSON
   */
  const updateBoard = await boardService.update(
    boardId,
    request.body as boardSetT
  );
  await reply.code(200).send(updateBoard);
};
