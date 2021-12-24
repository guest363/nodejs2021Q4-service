import { FastifyInstance } from 'fastify';
import buildApp from './app';
import { config } from './common/config';

let fastify: FastifyInstance;
/**
 * Анонимная функция инициализирующая работу сервера
 */
(async () => {
  fastify = await buildApp();
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
  process.stderr.write(`Can't buildApp ${error?.message}`);
  process.exit(1);
});

/**
 * Логируем uncaughtException
 */
process.on('uncaughtException', (error) => {
  fastify?.log?.error(error, 'uncaughtException');
  process.exit(1);
});
/**
 * Логируем unhandledRejection
 */
process.on('unhandledRejection', (error) => {
  fastify?.log?.error(error, 'unhandledRejection');
  process.exit(1);
});
