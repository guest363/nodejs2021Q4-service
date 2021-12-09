import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { Task } from '../task.model';
import { taskService } from '../task.service';

export const put = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId, taskId } = request.params as {
    boardId: string;
    taskId: string;
  };

  const isBoardExist = await boardService.getById(boardId);
  const isTaskExist = await taskService.getById({
    taskId,
  });

  if (!isBoardExist || !isTaskExist) {
    await reply.code(404).send();
  } else {
    /**
     * В типе body мы уверены за счет схемы postSchema которая валидирует JSON
     */
    const updatedTask = await taskService.update({
      boardId,
      taskId,
      task: request.body as Task,
    });
    if (!updatedTask) {
      await reply.code(404).send();
    }
    await reply.code(200).send(updatedTask);
  }
};
