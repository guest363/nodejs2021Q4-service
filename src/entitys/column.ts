import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BoardEntity } from './board';
import { TaskEntity } from './task';

/**
 * Entity Columns
 */

@Entity()
export class ColumnsEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  title!: string;

  @Column()
  order!: number;

  @OneToMany(() => TaskEntity, (task) => task.column, {
    eager: true,
    cascade: true,
  })
  tasks!: TaskEntity[];

  @ManyToOne(() => BoardEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board!: BoardEntity;
}
