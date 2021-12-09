import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { taskService } from '../task.service';

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId, taskId } = request.params as {
    boardId: string;
    taskId: string;
  };

  const isBoardExist = await boardService.getById(boardId);
  const task = await taskService.getById({
    taskId,
  });

  if (!isBoardExist || !task) {
    await reply.code(404).send();
  } else {
    await reply.code(200).send(task);
  }
};
