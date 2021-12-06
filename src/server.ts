import buildApp from './app';
import config from './common/config';

(async () => {
  const fastify = await buildApp();
  try {
    await fastify.listen(config.PORT, () => console.log(`App is running on http://localhost:${config.PORT}`));
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
