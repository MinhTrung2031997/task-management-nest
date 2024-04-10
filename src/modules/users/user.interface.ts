import { BaseRepositoryInterface } from '../../common/shared/base/base.interface';
import { UserEntity } from './user.entity';

export type UserRepositoryInterface = BaseRepositoryInterface<UserEntity>;
export const UserRepositoryInterface = Symbol.for('UserRepositoryInterface');
