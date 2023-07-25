import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { UsersController } from './controllers';
import { ExceptionFilter } from './filters';
import { LoggerService } from './services/LoggerService';
import { IExceptionFilter, ILoggerService, INVERSIFY_TYPES } from './types';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILoggerService>(INVERSIFY_TYPES.ILoggerService).to(LoggerService);
  bind<IExceptionFilter>(INVERSIFY_TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<UsersController>(INVERSIFY_TYPES.UsersController).to(UsersController);
  bind<App>(INVERSIFY_TYPES.Application).to(App);
});

const appContainer = new Container();
appContainer.load(appBindings);

const app = appContainer.get<App>(INVERSIFY_TYPES.Application);
app.init();
