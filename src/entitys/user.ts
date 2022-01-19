import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TaskEntity } from './task';

/**
 * Entity Пользователь
 */
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
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
