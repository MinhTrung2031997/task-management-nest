import { Column, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @Column()
  id: string;

  @Column({ default: Date })
  createdAt: Date;

  @Column({ default: Date })
  @UpdateDateColumn()
  updateAt: Date;
}
