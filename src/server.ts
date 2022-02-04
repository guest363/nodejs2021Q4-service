import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { config } from './common/config';
import { LoggerCustom, nestLogLevels } from './logger';

const logger = new LoggerCustom(config.LOG_LEVEL);

async function bootstrap() {
  const app = config.USE_FASTIFY
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: logger.getLogger() })
      )
    : await NestFactory.create<NestFastifyApplication>(AppModule, {
        logger: nestLogLevels[config.LOG_LEVEL],
      });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.PORT, '0.0.0.0');
}
bootstrap();

/**
 * Логируем uncaughtException
 */
process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException - ${error?.message}`);
  process.exit(1);
});
/**
 * Логируем unhandledRejection
 */
process.on('unhandledRejection', (error) => {
  if (error instanceof Error) {
    logger.error(`unhandledRejection - ${error?.message}`);
  } else logger.error(`unhandledRejection`);
  process.exit(1);
});
