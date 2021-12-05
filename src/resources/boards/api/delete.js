import { boardService } from '../board.service.js';

export const deleteById = async (request, reply) => {
  const { boardId } = request.params;
  const isBoardExist = boardService.getById(boardId);
  if (!isBoardExist) {
    reply.code(404);
    reply.send();
  } else {
    await boardService.delete(boardId);
    reply.code(204);
    reply.send();
  }
};
