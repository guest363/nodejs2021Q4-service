import { boardService } from '../board.service.js';

export const getById = async (request, reply) => {
  const board = await boardService.getById(request.params.boardId);
  reply.code(200);
  reply.send(board);
};
