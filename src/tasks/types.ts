import { Task } from './models/task.model';

export type taskGetT = Task;

export type taskSetT = Omit<Task, 'id'>;

export type TaskApiGetAllT = { boardId: string };
export type TaskApiCreateT = { boardId: string; task: taskSetT };
export type TaskApiGetByIdT = { taskId: string };
export type TaskApiDeleteT = { taskId: string; boardId: string };
export type TaskApiUpdateT = {
  taskId: string;
  boardId: string;
  task: taskSetT;
};
