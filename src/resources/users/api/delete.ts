import { FastifyReply, FastifyRequest } from 'fastify';
import { taskService } from '../../tasks/task.service';
import { usersService } from '../user.service';

export const deleteById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  /**
   * За счет getByIdSchema мы и уверены что в userId будет корректный UUID
   */
  const { userId } = request.params as { userId: string };
  const isUserExist = await usersService.getById(userId);
  if (!isUserExist) {
    await reply.code(404).send();
  } else {
    await usersService.delete(userId);

    const assignTasks = (await taskService.supportGetAll()).filter(
      (task) => task.userId === userId
    );

    assignTasks.forEach(async (task) => {
      await taskService.update({
        boardId: task.boardId,
        task: { ...task, userId: null },
        taskId: task.id,
      });
    });

    await reply.code(204).send();
  }
};
