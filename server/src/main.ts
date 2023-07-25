import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { UsersController } from './controllers';
import { ExceptionFilter } from './filters';
import { LoggerService } from './services/LoggerService';
import {
  IConfigService,
  IExceptionFilter,
  ILoggerService,
  INVERSIFY_TYPES,
  IUsersController,
  IUsersRepository,
  IUsersService,
} from './types';
import { ConfigService, UsersService, PrismaService } from './services';
import { UsersRepository } from './repositories';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILoggerService>(INVERSIFY_TYPES.LoggerService)
    .to(LoggerService)
    .inSingletonScope();
  bind<IExceptionFilter>(INVERSIFY_TYPES.ExceptionFilter)
    .to(ExceptionFilter)
    .inSingletonScope();
  bind<IUsersController>(INVERSIFY_TYPES.UsersController)
    .to(UsersController)
    .inSingletonScope();
  bind<IUsersService>(INVERSIFY_TYPES.UsersService)
    .to(UsersService)
    .inSingletonScope();
  bind<IConfigService>(INVERSIFY_TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind<PrismaService>(INVERSIFY_TYPES.PrismaService)
    .to(PrismaService)
    .inSingletonScope();
  bind<IUsersRepository>(INVERSIFY_TYPES.UsersRepository)
    .to(UsersRepository)
    .inSingletonScope();
  bind<App>(INVERSIFY_TYPES.Application).to(App);
});

const appContainer = new Container();
appContainer.load(appBindings);

const app = appContainer.get<App>(INVERSIFY_TYPES.Application);
app.init();
