import Fastify from 'fastify';
import swaggerUI from 'fastify-swagger';
import { existsSync } from 'fs';
import path from 'path';
import { Logger } from './logger';
import { boardRouter } from './resources/boards/board.router';
import { taskRouter } from './resources/tasks/task.router';
import { userRouter } from './resources/users/user.router';
import { __dirname } from './variables';

/**
 *
 * Инициализирует Fastify, роуты и swaggerUI
 *
 * @returns Промис резолвищейся в инстанс fastify сервера
 */
export default async function buildApp(logger: Logger) {
  const app = Fastify({
    logger: logger.getLogger(),
  });

  logger.initHooks(app);
  logger.error(path.join(__dirname, './doc/api.yaml'));
  if (existsSync('./doc/api.yaml')) {
    await app.register(swaggerUI, {
      mode: 'static',
      exposeRoute: true,
      routePrefix: '/doc',
      specification: {
        path: path.join(__dirname, './doc/api.yaml'),
        postProcessor(swaggerObject) {
          return swaggerObject;
        },
        baseDir: '/doc',
      },
    });
  }

  app.route({
    method: 'GET',
    url: '/',
    handler: async (_request, reply) => {
      await reply.send('Service is running!');
    },
  });

  await app.register(userRouter, { prefix: '/users' });
  await app.register(boardRouter, { prefix: '/boards' });
  await app.register(taskRouter, { prefix: '/boards' });

  return app;
}
