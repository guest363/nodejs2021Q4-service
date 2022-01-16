import typeorm from 'typeorm';
import { v4 } from 'uuid';

const { Column, Entity, PrimaryColumn } = typeorm;
type taskConstructorT = {
  id?: string;
  title: string;
  description: string;
  order: number;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
};
/**
 * Класс Задача
 */
@Entity()
export class Task {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  title!: string;

  @Column({ type: 'varchar', length: 600, nullable: false })
  description!: string;

  @Column()
  order!: number;

  @Column({ type: 'varchar', length: 128, nullable: true })
  userId: string | null;

  @Column({ type: 'varchar', length: 128, nullable: true })
  boardId: string | null;

  @Column({ type: 'varchar', length: 128, nullable: true })
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
  }: taskConstructorT) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
