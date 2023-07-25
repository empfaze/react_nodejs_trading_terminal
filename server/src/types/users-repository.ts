import { UserModel } from '@prisma/client';
import { User } from '../entities';

export interface IUsersRepository {
  create: (user: User) => Promise<UserModel>;
  findByEmail: (email: string) => Promise<UserModel | null>;
}
