import { boardService } from '../board.service.js';

export const put = async (request, reply) => {
  const updateBoard = await boardService.update(
    request.params.boardId,
    request.body
  );
  reply.code(200);
  reply.send(updateBoard);
};
