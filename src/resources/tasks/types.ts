import { Task } from './task.model';

export type taskGetT = Task;

export type taskSetT = Omit<Task, 'id'>;

export type taskApiGetAllT = { boardId: string };
export type taskApiCreateT = { boardId: string; task: taskSetT };
export type taskApiGetByIdT = { taskId: string };
export type taskApiDeleteT = { taskId: string };
export type taskApiUpdateT = {
  taskId: string;
  boardId: string;
  task: taskSetT;
};
