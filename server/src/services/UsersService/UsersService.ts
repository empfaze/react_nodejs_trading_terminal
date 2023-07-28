import { inject, injectable } from 'inversify';
import { compare } from 'bcryptjs';
import { UserModel } from '@prisma/client';
import { UserLoginDto, UserSignupDto } from '../../dto';
import { User } from '../../entities';
import {
  IConfigService,
  INVERSIFY_TYPES,
  IUsersRepository,
  IUsersService,
} from '../../types';

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject(INVERSIFY_TYPES.ConfigService)
    private configService: IConfigService,
    @inject(INVERSIFY_TYPES.UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  async createUser({
    email,
    name,
    password,
  }: UserSignupDto): Promise<UserModel | null> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      return null;
    }

    const newUser = new User(email, name);
    await newUser.setPassword(password, Number(this.configService.get('SALT')));

    return this.usersRepository.create(newUser);
  }

  async isUserValid({ email, password }: UserLoginDto): Promise<boolean> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return false;
    }

    return compare(password, user.password);
  }

  async getUser(email: string): Promise<UserModel | null> {
    return this.usersRepository.findByEmail(email);
  }
}
