import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ default: Date() })
  @CreateDateColumn()
  created_at: Date;
}
