/**
 * Класс Задача
 */
export class Task {
  id!: string;

  title!: string;

  description!: string;

  order!: number;

  userId!: string | null;

  boardId!: string | null;

  columnId!: string | null;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
