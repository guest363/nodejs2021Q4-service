import { Task } from './task.model';

export type taskGetT = Pick<
  Task,
  'id' | 'title' | 'order' | 'description' | 'userId' | 'boardId' | 'columnId'
>;

export type taskSetT = Pick<
  Task,
  'title' | 'order' | 'description' | 'userId' | 'boardId' | 'columnId'
>;

export type taskApiGetAllT = { boardId: string };
export type taskApiCreateT = { boardId: string; task: taskSetT };
export type taskApiGetByIdT = { taskId: string };
export type taskApiDeleteT = { taskId: string };
export type taskApiUpdateT = {
  taskId: string;
  boardId: string;
  task: taskSetT;
};
