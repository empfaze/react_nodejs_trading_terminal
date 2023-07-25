import { Response, Router } from 'express';
import { IControllerRoute, ILoggerService } from '../../types';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public sendResponse<T>(res: Response, code: number, message: T) {
    res.type('application/json');

    return res.status(code).json(message);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    routes.forEach(({ method, path, handler }) => {
      this.logger.log(`[${method}] ${path}`);

      this.router[method](path, handler.bind(this));
    });
  }
}
