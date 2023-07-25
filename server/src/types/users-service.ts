import { UserModel } from '@prisma/client';
import { UserLoginDto, UserSignupDto } from '../dto';

export interface IUsersService {
  createUser: (dto: UserSignupDto) => Promise<UserModel | null>;
  isUserValid: (dto: UserLoginDto) => Promise<boolean>;
}
