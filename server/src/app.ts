import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { json } from 'body-parser';
import { UsersController } from './controllers';
import { IExceptionFilter, ILoggerService, INVERSIFY_TYPES } from './types';
import { PrismaService } from './services';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(INVERSIFY_TYPES.LoggerService) private logger: ILoggerService,
    @inject(INVERSIFY_TYPES.UsersController)
    private usersController: UsersController,
    @inject(INVERSIFY_TYPES.ExceptionFilter)
    private exceptionFilter: IExceptionFilter,
    @inject(INVERSIFY_TYPES.PrismaService) private prismaService: PrismaService,
  ) {
    this.app = express();
    this.port = 4000;
  }

  useRoutes() {
    this.app.use('/users', this.usersController.router);
  }

  useMiddleware() {
    this.app.use(json());
  }

  useExceptionFilters() {
    const exceptionFilterHandler = this.exceptionFilter.catch.bind(
      this.exceptionFilter,
    );

    this.app.use(exceptionFilterHandler);
  }

  public async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();

    await this.prismaService.connect();

    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://127.0.0.1:${this.port}`);
  }
}
