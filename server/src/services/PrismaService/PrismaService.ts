import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILoggerService, INVERSIFY_TYPES } from '../../types';

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(
    @inject(INVERSIFY_TYPES.LoggerService)
    private loggerService: ILoggerService,
  ) {
    this.client = new PrismaClient();
  }

  async connect() {
    try {
      await this.client.$connect();

      this.loggerService.log('[PrismaService] Database successfully connected');
    } catch (err) {
      if (err instanceof Error) {
        this.loggerService.error(
          `[PrismaService] An error occured while connecting to database: ${err.message}`,
        );
      }
    }
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}
