import { Task } from './task.model.js';

const inMemoryDb = new Map();

export const taskRepo = {
  getAll: async ({ boardId }) => {
    const filtredTasks = [...inMemoryDb.values()].filter(
      (task) => task.boardId === boardId
    );
    return filtredTasks;
  },
  supportGetAll: async () => [...inMemoryDb.values()],
  create: async ({ boardId, task }) => {
    const createdTask = new Task({ ...task, boardId });
    inMemoryDb.set(createdTask.id, createdTask);
    return createdTask;
  },
  getById: async ({ taskId }) => inMemoryDb.get(taskId),
  delete: async ({ taskId }) => inMemoryDb.delete(taskId),
  update: async ({ boardId, taskId, task }) => {
    const oldBoard = inMemoryDb.get(taskId);

    const newBoard = { ...oldBoard, ...task, boardId  };
    inMemoryDb.set(oldBoard?.id, newBoard);
    return newBoard;
  },
};
