import { v4 } from 'uuid';
import { Columns } from './columns.model';

type boardConstructorT = {
  id?: string;
  title: string;
  columns: {
    id: string;
    title: string;
    order: number;
  }[];
};
/**
 * Класс Доска
 */

export class Board {
  id!: string;

  title!: string;

  columns: Columns[] = []; // see = [] initialization here

  constructor({
    id = v4(),
    title = 'Default board',
    columns = [{ id: v4(), title: 'Default column', order: 0 }],
  }: boardConstructorT) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
