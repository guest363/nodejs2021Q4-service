import { Columns } from './columns.model';

/**
 * Класс Доска
 */

export class Board {
  id!: string;

  title!: string;

  columns: Columns[] = []; // see = [] initialization here

  constructor(partial: Partial<Board>) {
    Object.assign(this, partial);
  }
}
