import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { HTTPError, IMiddleware } from '../../types';

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return next(new HTTPError(401, 'Unauthorized', 'Access denied'));
    }

    const token = req.headers.authorization?.split(' ')[1];

    verify(token, this.secret, (err, payload) => {
      if (err) {
        return next(new HTTPError(401, 'Unauthorized', 'Access denied'));
      }

      req.email = (payload as JwtPayload).email;
      next();
    });
  }
}
