import Fastify from 'fastify';
import swaggerUI from 'fastify-swagger';
import path from 'path';
import { boardRouter } from './resources/boards/board.router';
import { taskRouter } from './resources/tasks/task.router';
import { userRouter } from './resources/users/user.router';
import { __dirname } from './variables';

export default async function buildApp() {
  const app = Fastify({ logger: true });

  app.register(swaggerUI, {
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

  app.route({
    method: 'GET',
    url: '/',
    handler: (request, reply) => {
      reply.send('Service is running!');
    },
  });

  app.register(userRouter, { prefix: '/users' });
  app.register(boardRouter, { prefix: '/boards' });
  app.register(taskRouter, { prefix: '/boards' });

  return app;
}
