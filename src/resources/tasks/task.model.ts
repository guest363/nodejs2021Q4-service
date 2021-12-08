import { v4 } from 'uuid';

export class Task {
  id: string;

  title: string;

  description: string;

  order: number;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = v4(),
    title = 'Default task',
    description = 'Some awesome description',
    order = 0,
    /**
     * assignee entity
     */
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
