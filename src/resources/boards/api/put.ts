import { boardService } from '../board.service';

export const put = async (request, reply) => {
  const updateBoard = await boardService.update(
    request.params.boardId,
    request.body,
  );
  reply.code(200);
  reply.send(updateBoard);
};
