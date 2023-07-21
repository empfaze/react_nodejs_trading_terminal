import { App } from './app';
import { UsersController } from './controllers';
import { ExceptionFilter } from './filters';
import { LoggerService } from './services/LoggerService';

const bootsrap = async () => {
  const logger = new LoggerService();

  const app = new App(
    logger,
    new UsersController(logger),
    new ExceptionFilter(logger),
  );

  app.init();
};

bootsrap();
