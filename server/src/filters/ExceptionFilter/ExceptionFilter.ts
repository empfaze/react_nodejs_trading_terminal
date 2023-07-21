import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../../services';
import { HTTPError, IExceptionFilter } from '../../types';

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.context}] - Status ${err.code} -  ${err.message}`,
      );

      res.status(err.code).send({ err: err.message });
    } else {
      this.logger.error(err.message);

      res.status(500).send({ err: err.message });
    }
  }
}
