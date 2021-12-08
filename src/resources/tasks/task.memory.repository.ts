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
  getAll: async (props: taskApiGetAllT) =>
    new Promise((resolve) => {
      const filtredTasks = [...inMemoryDb.values()].filter(
        (task) => task.boardId === props.boardId
      );
      resolve(filtredTasks);
    }),
  supportGetAll: async () =>
    new Promise((resolve) => {
      resolve([...inMemoryDb.values()]);
    }),
  create: async ({ task, boardId }: taskApiCreateT) =>
    new Promise((resolve) => {
      const createdTask = new Task({ ...task, boardId });
      inMemoryDb.set(createdTask.id, createdTask);
      resolve(createdTask);
    }),
  getById: async ({ taskId }: taskApiGetByIdT) =>
    new Promise((resolve) => {
      resolve(inMemoryDb.get(taskId));
    }),
  delete: async ({ taskId }: taskApiDeleteT) =>
    new Promise((resolve, reject) => {
      if (!inMemoryDb.has(taskId)) {
        reject(new Error('deleted task not found'));
      }
      inMemoryDb.delete(taskId);
      resolve(true);
    }),
  update: async ({ boardId, taskId, task }: taskApiUpdateT) =>
    new Promise((resolve, reject) => {
      const oldBoard = inMemoryDb.get(taskId);
      if (!oldBoard) {
        reject(new Error('updated board not found'));
      }
      const newBoard = { ...oldBoard, ...task, boardId };
      inMemoryDb.set((oldBoard as Task).id, newBoard);
      resolve(newBoard);
    }),
};
