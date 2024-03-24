import { BaseInterfaceRepository } from '../../common/shared/base/base.interface';
import { UserEntity as User } from './user.entity';

export type UserRepositoryInterface = BaseInterfaceRepository<User>;
