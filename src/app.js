import fastify from 'fastify';
import swaggerUI from 'fastify-swagger';
import path from 'path';
import YAML from 'yamljs';
import { userRouter } from './resources/users/user.router.js';
import { __dirname } from './variables.js';

const app = fastify({ logger: true });

const swaggerDocument = YAML.load(path.join(__dirname, './doc/api.yaml'));

fastify.register(swaggerUI, {
  routePrefix: '/doc',
  swagger: swaggerDocument,
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

export default app;
