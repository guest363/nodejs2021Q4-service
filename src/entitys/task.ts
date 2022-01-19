import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardEntity } from './board';
import { ColumnsEntity } from './column';
import { UserEntity } from './user';

/**
 * Entity Задача
 */
@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  title!: string;

  @Column({ type: 'varchar', length: 600, nullable: false })
  description!: string;

  @Column()
  order!: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks, {
    eager: false,
    onDelete: 'SET NULL',
  })
  user!: UserEntity;

  @Column({ type: 'varchar', nullable: true })
  userId!: string | null;

  @ManyToOne(() => BoardEntity, (board) => board.tasks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  board!: BoardEntity;

  @Column({ type: 'varchar', nullable: true })
  boardId!: string | null;

  @ManyToOne(() => ColumnsEntity, (column) => column.tasks, {
    eager: false,
  })
  column!: ColumnsEntity;

  @Column({ type: 'varchar', nullable: true })
  columnId!: string | null;
}
