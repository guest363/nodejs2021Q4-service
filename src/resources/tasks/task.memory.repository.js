import { boardService } from '../boards/board.service.js';
import { usersService } from '../users/user.service.js';
import { Task } from './task.model.js';

const inMemoryDb = new Map();

export const taskRepo = {
  getAll: async ({ boardId }) =>
    [...inMemoryDb.values()].filter((task) => task.boardId === boardId),
  create: async (info) => {
    const board = boardService.getById(info.boardId);
    const column = board[info.columnId];
    const user = usersService.getById(info.userId);
    if (!user || !board || !column) {
      return '';
    }
    const task = new Task(info);
    inMemoryDb.set(task.id, task);
    return task;
  },
  getById: async ({ boardId, taskId }) => {
    const task = inMemoryDb.get(taskId);
    return task.boardId === boardId ? task : '';
  },
  delete: async (id) => inMemoryDb.delete(id),
  update: async (id, board) => {
    const oldBoard = inMemoryDb.get(id);
    const newBoard = { ...oldBoard, ...board };
    inMemoryDb.set(id, newBoard);
    return newBoard;
  },
};
