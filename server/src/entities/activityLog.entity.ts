import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ActivityLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionType: string;

  @Column()
  entityType: string;

  @Column()
  entityTypeId: number;

  @Column()
  log: string;

  @CreateDateColumn()
  createdAt: Date;
}
