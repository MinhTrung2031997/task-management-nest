import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  @UpdateDateColumn()
  updateAt: Date;
}
