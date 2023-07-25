import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import {
  HTTPError,
  IControllerRoute,
  ILoggerService,
  INVERSIFY_TYPES,
  IUsersService,
} from '../../types';
import { BaseController } from '../BaseController';
import { IUsersController } from '../../types';
import { UserLoginDto, UserSignupDto } from '../../dto';
import { ValidationMiddleware } from '../../middlewares';

@injectable()
export class UsersController
  extends BaseController
  implements IUsersController
{
  routesData: IControllerRoute[] = [
    {
      path: '/signup',
      method: 'post',
      handler: this.signup,
      middlewares: [new ValidationMiddleware(UserSignupDto)],
    },
    {
      path: '/login',
      method: 'post',
      handler: this.login,
      middlewares: [new ValidationMiddleware(UserLoginDto)],
    },
  ];

  constructor(
    @inject(INVERSIFY_TYPES.LoggerService) loggerService: ILoggerService,
    @inject(INVERSIFY_TYPES.UsersService) private usersService: IUsersService,
  ) {
    super(loggerService);

    this.bindRoutes(this.routesData);
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ) {
    const isUserValid = await this.usersService.isUserValid(body);

    if (!isUserValid) {
      return next(new HTTPError(401, 'Unauthorized', 'Login'));
    }

    this.sendResponse(res, 200, 'Authorized');
  }

  async signup(
    { body }: Request<{}, {}, UserSignupDto>,
    res: Response,
    next: NextFunction,
  ) {
    const user = await this.usersService.createUser(body);

    if (!user) {
      return next(new HTTPError(422, 'User already exists!', 'Signup'));
    }

    this.sendResponse(res, 200, {
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }
}
