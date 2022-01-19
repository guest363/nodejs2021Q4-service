import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardEntity } from './board';
import { TaskEntity } from './task';

/**
 * Entity Columns
 */

@Entity()
export class ColumnsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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
