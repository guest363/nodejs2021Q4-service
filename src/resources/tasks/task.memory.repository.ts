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
  getAll: async (props: taskApiGetAllT): Promise<Task[]> =>
    new Promise((resolve) => {
      const filtredTasks = [...inMemoryDb.values()].filter(
        (task) => task.boardId === props.boardId
      );
      resolve(filtredTasks);
    }),
  supportGetAll: async (): Promise<Task[]> =>
    new Promise((resolve) => {
      resolve([...inMemoryDb.values()]);
    }),
  create: async ({ task, boardId }: taskApiCreateT): Promise<Task> =>
    new Promise((resolve) => {
      const createdTask = new Task({ ...task, boardId });
      inMemoryDb.set(createdTask.id, createdTask);
      resolve(createdTask);
    }),
  getById: async ({ taskId }: taskApiGetByIdT): Promise<Task | void> =>
    new Promise((resolve) => {
      resolve(inMemoryDb.get(taskId));
    }),
  delete: async ({ taskId }: taskApiDeleteT): Promise<boolean | Error> =>
    new Promise((resolve, reject) => {
      if (!inMemoryDb.has(taskId)) {
        reject(new Error('deleted task not found'));
      }
      inMemoryDb.delete(taskId);
      resolve(true);
    }),
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
