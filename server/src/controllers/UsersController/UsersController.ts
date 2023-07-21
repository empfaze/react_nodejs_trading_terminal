import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../../services';
import { HTTPError, IControllerRoute } from '../../types';
import { BaseController } from '../BaseController';

export class UsersController extends BaseController {
  routesData: IControllerRoute[] = [
    { path: '/signup', method: 'post', handler: this.signup },
    { path: '/login', method: 'post', handler: this.login },
  ];

  constructor(logger: LoggerService) {
    super(logger);

    this.bindRoutes(this.routesData);
  }

  login(req: Request, res: Response, next: NextFunction) {
    // this.sendResponse(res, 200, 'Login');
    next(new HTTPError(401, 'Authorization error'));
  }

  signup(req: Request, res: Response, next: NextFunction) {
    this.sendResponse(res, 200, 'Signup');
  }
}
