import { BaseRepositoryInterface } from '../../common/shared/base/base.interface';
import { TaskEntity } from './task.entity';

export type TaskRepositoryInterface = BaseRepositoryInterface<TaskEntity>;
export const TaskRepositoryInterface = Symbol.for('UserRepositoryInterface');
