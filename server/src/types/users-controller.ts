import { NextFunction, Request, Response } from 'express';

export interface IUsersController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  signup: (req: Request, res: Response, next: NextFunction) => void;
}
