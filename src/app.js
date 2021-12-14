import Fastify from 'fastify';
import swaggerUI from 'fastify-swagger';
import path from 'path';
import YAML from 'yamljs';
import { boardRouter } from './resources/boards/board.router.js';
import { taskRouter } from './resources/tasks/task.router.js';
import { userRouter } from './resources/users/user.router.js';
import { __dirname } from './variables.js';

export default async function buildApp() {
  const app = Fastify({ logger: true });

  const swaggerDocument = YAML.load(path.join(__dirname, './doc/api.yaml'));

  app.register(swaggerUI, {
    routePrefix: '/doc',
    swagger: swaggerDocument,
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest(request, reply, next) {
        next();
      },
      preHandler(request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
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
