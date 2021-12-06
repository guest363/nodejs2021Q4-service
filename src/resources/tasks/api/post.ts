import { boardService } from '../../boards/board.service';
import { taskService } from '../task.service';

export const post = async (request, reply) => {
  const isBoardExist = await boardService.getById(request.params.boardId);

  if (!isBoardExist) {
    reply.code(404);
    reply.send();
  } else {
    const createTask = await taskService.create({
      boardId: request.params.boardId,
      task: request.body,
    });
    reply.code(201);
    reply.send(createTask);
  }
};
