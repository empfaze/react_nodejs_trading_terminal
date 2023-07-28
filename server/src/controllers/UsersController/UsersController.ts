import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import {
  HTTPError,
  IConfigService,
  ILoggerService,
  INVERSIFY_TYPES,
  IUsersService,
} from '../../types';
import { BaseController } from '../BaseController';
import { IUsersController } from '../../types';
import { UserLoginDto, UserSignupDto } from '../../dto';
import { AuthMiddleware, ValidationMiddleware } from '../../middlewares';

@injectable()
export class UsersController
  extends BaseController
  implements IUsersController
{
  constructor(
    @inject(INVERSIFY_TYPES.LoggerService) loggerService: ILoggerService,
    @inject(INVERSIFY_TYPES.UsersService) private usersService: IUsersService,
    @inject(INVERSIFY_TYPES.ConfigService)
    private configService: IConfigService,
  ) {
    super(loggerService);

    this.bindRoutes([
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
      {
        path: '/info',
        method: 'get',
        handler: this.info,
        middlewares: [new AuthMiddleware(this.configService.get('SECRET'))],
      },
    ]);
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

    const accessToken = await this.signJWT(
      body.email,
      this.configService.get('SECRET'),
    );

    this.sendResponse(res, 200, { accessToken });
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

  async info(
    { email }: Request<{}, {}, UserSignupDto>,
    res: Response,
    next: NextFunction,
  ) {
    const user = await this.usersService.getUser(email!);

    this.sendResponse(res, 200, {
      id: user?.id,
      email: user?.email,
      name: user?.name,
    });
  }

  private async signJWT(email: string, secret: string) {
    return new Promise((resolve, reject) => {
      sign(
        { email, iat: Math.floor(Date.now() / 1000) },
        secret,
        { algorithm: 'HS256' },
        (err, token) => {
          if (err) {
            reject(err);
          }

          resolve(token);
        },
      );
    });
  }
}
