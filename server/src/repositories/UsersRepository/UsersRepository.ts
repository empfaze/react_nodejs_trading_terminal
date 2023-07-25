import { inject, injectable } from 'inversify';
import { User } from '../../entities';
import { INVERSIFY_TYPES, IUsersRepository } from '../../types';
import { PrismaService } from '../../services';
import { UserModel } from '@prisma/client';

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @inject(INVERSIFY_TYPES.PrismaService) private prismaService: PrismaService,
  ) {}

  async create({ email, name, password }: User): Promise<UserModel> {
    return this.prismaService.client.userModel.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  }
}
