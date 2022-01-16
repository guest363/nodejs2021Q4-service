import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
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

@Entity()
export class Board {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  title: string;

  @ManyToMany((type) => Columns, (Columns) => Columns.id)
  @JoinTable()
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
