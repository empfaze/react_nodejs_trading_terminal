import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IControllerRoute, ILoggerService, INVERSIFY_TYPES } from '../../types';
import { BaseController } from '../BaseController';
import { IUsersController } from '../../types/users-controller';

@injectable()
export class UsersController
  extends BaseController
  implements IUsersController
{
  routesData: IControllerRoute[] = [
    { path: '/signup', method: 'post', handler: this.signup },
    { path: '/login', method: 'post', handler: this.login },
  ];

  constructor(
    @inject(INVERSIFY_TYPES.ILoggerService)
    private loggerService: ILoggerService,
  ) {
    super(loggerService);

    this.bindRoutes(this.routesData);
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.sendResponse(res, 200, 'Login');
  }

  signup(req: Request, res: Response, next: NextFunction) {
    this.sendResponse(res, 200, 'Signup');
  }
}
