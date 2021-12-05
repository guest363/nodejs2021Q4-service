import { boardService } from '../../boards/board.service.js';
import { taskService } from '../task.service.js';

export const put = async (request, reply) => {
  const isBoardExist = await boardService.getById(request.params.boardId);
  const isTaskExist = await taskService.getById({
    taskId: request.params.taskId,
  });

  if (!isBoardExist || !isTaskExist) {
    reply.code(404);
    reply.send();
  } else {
    const updatedTask = await taskService.update({
      boardId: request.params.boardId,
      taskId: request.params.taskId,
      task: request.body,
    });
    if (!updatedTask) {
      reply.code(404);
      reply.send();
    }
    reply.code(200);
    reply.send(updatedTask);
  }
};
