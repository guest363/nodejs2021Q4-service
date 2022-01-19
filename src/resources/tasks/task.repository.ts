import { getRepository } from 'typeorm';
import { TaskEntity } from './../../entitys/task';
import { Task } from './task.model';
import {
  taskApiCreateT,
  taskApiDeleteT,
  taskApiGetAllT,
  taskApiGetByIdT,
  taskApiUpdateT,
} from './types';

export const taskRepo = {
  /**
   * Возвращает список всех задач на доске
   *
   * @param info - info.boardId ИД с какой доски собирать задачи
   * @returns список всех задач
   */
  getAll: async (props: taskApiGetAllT): Promise<Task[]> =>
    await getRepository(TaskEntity).find({ id: props.boardId }),
  /**
   * Служеюная функция для получения всех задачь со всех бордов
   *
   * @returns возвращает все задачи со всех бордов
   */
  supportGetAll: async (): Promise<Task[]> =>
    await getRepository(TaskEntity).find(),

  /**
   * Создает и возвращает новую задачу
   *
   * @param info - данные для создания новой задачи.
   * - info.task - задача,
   * - info.boardId id к какой доске привязать
   * @returns созданная задача
   */
  create: async ({ task, boardId }: taskApiCreateT): Promise<Task> => {
    const newTask = new Task({ ...task, boardId });
    await getRepository(TaskEntity).save(newTask);

    return newTask;
  },
  /**
   * Возвращает задачу по ID
   *
   * @param info
   * - info.id запрашиваемой задачи
   * @returns полученная по ID задача
   */
  getById: async ({ taskId }: taskApiGetByIdT): Promise<Task | void> =>
    await getRepository(TaskEntity).findOne(taskId),
  /**
   * Удаляет задачу по ИД
   *
   * @param info - info.taskId ID задачи для удаления
   * @returns
   * - true в случае успеха
   * - Error в случае ошибки
   */
  delete: async ({ taskId }: taskApiDeleteT): Promise<boolean | Error> => {
    const result = await getRepository(TaskEntity).delete(taskId);

    return result.affected === 0 ? false : true;
  },
  /**
   * Обновляет задачу
   *
   * @param info - данные для обновления
   * - info.boardId - ID борда к которой приязанв задача
   * - info.taskId - ID обновляемой задачи
   * - info.task - задача
   * @returns  - Error в случае ошибки обновления, если задачи для обновления нет
   * - обновленную задачу в случае успеха
   */
  update: async ({
    boardId,
    taskId,
    task,
  }: taskApiUpdateT): Promise<Task | Error> => {
    const savedTask = await getRepository(TaskEntity).findOne({
      where: { id: taskId, boardId },
    });

    if (savedTask === void 0) {
      throw new Error('Task not update');
    }

    const newTask = { ...savedTask, task };
    await getRepository(Task).save(newTask);

    return newTask;
  },
};
