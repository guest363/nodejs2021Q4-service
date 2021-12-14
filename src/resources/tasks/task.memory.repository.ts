import { Task } from './task.model';
import {
  taskApiCreateT,
  taskApiDeleteT,
  taskApiGetAllT,
  taskApiGetByIdT,
  taskApiUpdateT,
} from './types';

const inMemoryDb = new Map() as Map<string, Task>;

export const taskRepo = {
  /**
   * Возвращает список всех задач на доске
   *
   * @param info - info.boardId ИД с какой доски собирать задачи
   * @returns список всех задач
   */
  getAll: async (props: taskApiGetAllT): Promise<Task[]> =>
    new Promise((resolve) => {
      const filtredTasks = [...inMemoryDb.values()].filter(
        (task) => task.boardId === props.boardId
      );
      resolve(filtredTasks);
    }),
  /**
   * Служеюная функция для получения всех задачь со всех бордов
   *
   * @returns возвращает все задачи со всех бордов
   */
  supportGetAll: async (): Promise<Task[]> =>
    new Promise((resolve) => {
      resolve([...inMemoryDb.values()]);
    }),

  /**
   * Создает и возвращает новую задачу
   *
   * @param info - данные для создания новой задачи.
   * - info.task - задача,
   * - info.boardId id к какой доске привязать
   * @returns созданная задача
   */
  create: async ({ task, boardId }: taskApiCreateT): Promise<Task> =>
    new Promise((resolve) => {
      const createdTask = new Task({ ...task, boardId });
      inMemoryDb.set(createdTask.id, createdTask);
      resolve(createdTask);
    }),
  /**
   * Возвращает задачу по ID
   *
   * @param info
   * - info.id запрашиваемой задачи
   * @returns полученная по ID задача
   */
  getById: async ({ taskId }: taskApiGetByIdT): Promise<Task | void> =>
    new Promise((resolve) => {
      resolve(inMemoryDb.get(taskId));
    }),
  /**
   * Удаляет задачу по ИД
   *
   * @param info - info.taskId ID задачи для удаления
   * @returns
   * - true в случае успеха
   * - Error в случае ошибки
   */
  delete: async ({ taskId }: taskApiDeleteT): Promise<boolean | Error> =>
    new Promise((resolve, reject) => {
      if (!inMemoryDb.has(taskId)) {
        reject(new Error('deleted task not found'));
      }
      inMemoryDb.delete(taskId);
      resolve(true);
    }),
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
  }: taskApiUpdateT): Promise<Task | Error> =>
    new Promise((resolve, reject) => {
      const oldTask = inMemoryDb.get(taskId);
      if (!oldTask) {
        reject(new Error('updated task not found'));
      }
      const updateTask = { ...(oldTask as Task), ...task, boardId };
      inMemoryDb.set((oldTask as Task).id, updateTask);
      resolve(updateTask);
    }),
};
