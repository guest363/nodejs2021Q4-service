import buildApp from './app.js';
import config from './common/config.js';

(async () => {
  const fastify = await buildApp();
  try {
    await fastify.listen(config.PORT, () =>
      console.log(`App is running on http://localhost:${config.PORT}`)
    );
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
