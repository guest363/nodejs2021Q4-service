import { boardService } from '../board.service';

export const getById = async (request, reply) => {
  const board = await boardService.getById(request.params.boardId);
  if (!board) {
    reply.code(404);
    reply.send();
  } else {
    reply.code(200);
    reply.send(board);
  }
};
