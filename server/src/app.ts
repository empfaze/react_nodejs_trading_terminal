import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { UsersController } from './controllers';
import { IExceptionFilter, ILoggerService, INVERSIFY_TYPES } from './types';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(INVERSIFY_TYPES.ILoggerService) private logger: ILoggerService,
    @inject(INVERSIFY_TYPES.UsersController)
    private usersController: UsersController,
    @inject(INVERSIFY_TYPES.IExceptionFilter)
    private exceptionFilter: IExceptionFilter,
  ) {
    this.app = express();
    this.port = 4000;
  }

  useRoutes() {
    this.app.use('/users', this.usersController.router);
  }

  useExceptionFilters() {
    const exceptionFilterHandler = this.exceptionFilter.catch.bind(
      this.exceptionFilter,
    );

    this.app.use(exceptionFilterHandler);
  }

  public async init() {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://127.0.0.1:${this.port}`);
  }
}
