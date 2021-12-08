import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { taskService } from '../task.service';

export const put = async (request: FastifyRequest, reply: FastifyReply) => {
  const isBoardExist = await boardService.getById(request.params.boardId);
  const isTaskExist = await taskService.getById({
    taskId: request.params.taskId,
  });

  if (!isBoardExist || !isTaskExist) {
    await reply.code(404).send();
  } else {
    const updatedTask = await taskService.update({
      boardId: request.params.boardId,
      taskId: request.params.taskId,
      task: request.body,
    });
    if (!updatedTask) {
      await reply.code(404).send();
    }
    await reply.code(200).send(updatedTask);
  }
};
