import { Task } from './task.model.js';

const inMemoryDb = new Map();

export const taskRepo = {
  getAll: async ({ boardId }) => {
    const filtredTasks = [...inMemoryDb.values()].filter(
      (task) => task.boardId === boardId
    );
    return filtredTasks;
  },
  create: async ({ boardId, task }) => {
    const createdTask = new Task({ ...task, boardId });
    inMemoryDb.set(task.id, createdTask);
    return createdTask;
  },
  getById: async ({ taskId }) => inMemoryDb.get(taskId),
  delete: async (id) => inMemoryDb.delete(id),
  update: async ({ boardId, taskId, task }) => {
    const oldBoard = inMemoryDb.get(taskId);
    const newBoard = { ...oldBoard, ...task, ...{ boardId } };
    inMemoryDb.set(taskId, newBoard);
    return newBoard;
  },
};
