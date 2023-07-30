import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { HTTPError, IMiddleware } from '../../types';

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return next(new HTTPError(401, 'Unauthorized', 'Access denied'));
    }

    verify(req.headers.authorization, this.secret, (err, payload) => {
      if (err) {
        return next(new HTTPError(401, err.name, err.message));
      }

      req.email = (payload as JwtPayload).email;
      next();
    });
  }
}
