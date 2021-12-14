import { taskService } from '../../tasks/task.service.js';
import { usersService } from '../user.service.js';

export const deleteById = async (request, reply) => {
  const { userId } = request.params;
  const isUserExist = await usersService.getById(userId);
  if (!isUserExist) {
    reply.code(404);
    reply.send();
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

    reply.code(204);
    reply.send();
  }
};
