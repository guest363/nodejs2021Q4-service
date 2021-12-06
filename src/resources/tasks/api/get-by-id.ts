import { boardService } from '../../boards/board.service';
import { taskService } from '../task.service';

export const getById = async (request, reply) => {
  const isBoardExist = await boardService.getById(request.params.boardId);
  const task = await taskService.getById({
    taskId: request.params.taskId,
  });

  if (!isBoardExist || !task) {
    reply.code(404);
    reply.send();
  } else {
    reply.code(200);
    reply.send(task);
  }
};
