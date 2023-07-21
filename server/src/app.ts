import express, { Express } from 'express';
import { Server } from 'http';
import { UsersController } from './controllers';
import { ExceptionFilter } from './filters';
import { ILogger } from './types';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: ILogger;
  usersController: UsersController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: ILogger,
    usersController: UsersController,
    exceptionFilter: ExceptionFilter,
  ) {
    this.app = express();
    this.port = 4000;
    this.logger = logger;
    this.usersController = usersController;
    this.exceptionFilter = exceptionFilter;
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
