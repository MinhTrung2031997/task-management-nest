import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management-nestjs',
      autoLoadEntities: true,
      // entities: ["modules/**/entity/*.js"],
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
