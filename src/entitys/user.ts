import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { TaskEntity } from './task';

/**
 * Entity Пользователь
 */
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  login!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password!: string;

  @OneToMany(() => TaskEntity, (task) => task.user, {
    eager: false,
  })
  tasks!: TaskEntity[];
}
