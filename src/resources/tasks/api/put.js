import { boardService } from '../../boards/board.service.js';
import { taskService } from '../task.service.js';

export const put = async (request, reply) => {
  const isBoardExist = boardService.getById(request.params.boardId);
  if (!isBoardExist) {
    reply.code(404);
    reply.send();
  } else {
    const updatedTask = await taskService.update({
      boardId: request.params.boardId,
      taskId: request.params.taskId,
      task: request.body,
    });
    reply.code(200);
    reply.send(updatedTask);
  }
};
