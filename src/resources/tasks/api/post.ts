import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { Task } from '../task.model';
import { taskService } from '../task.service';

export const post = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = request.params as { boardId: string };
  const isBoardExist = await boardService.getById(boardId);

  if (!isBoardExist) {
    await reply.code(404).send();
  } else {
    /**
     * В типе body мы уверены за счет схемы postSchema которая валидирует JSON
     */
    const createTask = await taskService.create({
      boardId: (request.params as { boardId: string }).boardId,
      task: request.body as Task,
    });
    await reply.code(201).send(createTask);
  }
};
