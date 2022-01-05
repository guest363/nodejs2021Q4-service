import { FastifyInstance } from 'fastify';
import buildApp from './app';
import { config } from './common/config';
import { Logger } from './logger';

let fastify: FastifyInstance;
const logger = new Logger(config.LOG_LEVEL);

/**
 * Анонимная функция инициализирующая работу сервера
 */
(async () => {
  fastify = await buildApp(logger);
  try {
    fastify.listen(config.PORT, () =>
      fastify.log.info(
        `App is running on http://localhost:${String(config.PORT)}`
      )
    );
    /* throw new Error('') */
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})().catch((error: Error) => {
  logger.error(`Can't buildApp ${error?.message}`);
  process.exit(1);
});

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
