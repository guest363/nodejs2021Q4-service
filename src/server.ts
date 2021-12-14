import buildApp from './app';
import { config } from './common/config';

/**
 * Анонимная функция инициализирующая работу сервера
 */
(async () => {
  const fastify = await buildApp();
  try {
    fastify.listen(config.PORT, () =>
      console.log(`App is running on http://localhost:${String(config.PORT)}`)
    );
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})().catch((error: Error) => {
  process.stderr.write(`Can't buildApp ${error?.message}`);
  process.exit(1);
});
