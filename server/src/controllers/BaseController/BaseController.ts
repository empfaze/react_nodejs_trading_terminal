import { Response, Router } from 'express';
import { LoggerService } from '../../services';
import { IControllerRoute } from '../../types';

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
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
