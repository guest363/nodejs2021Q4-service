import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

enum logLevels {
  error = 0, // (ошибка)
  warn = 1, // (предупреждение)
  info = 2, // (информация)
  debug = 3, // (отладочное сообщение)
  trace = 4, // (все сообщения)
}

export class Logger {
  logLevel = 0;

  constructor(logLevel: logLevels) {
    this.logLevel = logLevel;
  }

  /**
   * Инициализирует хук для логирование тела запросса
   */
  public initHooks(app: FastifyInstance) {
    if (this.logLevel === logLevels.info) {
      app.addHook('preHandler', (req, _reply, done) => {
        if (req.body) {
          req.log.info({ body: req.body }, 'parsed body');
        }
        done();
      });
    }
  }

  /**
   * Возвращает конфиг для логера
   */
  public getConfig() {
    return {
      prettyPrint: true,
      level: logLevels[this.logLevel],
      serializers: {
        res(reply: FastifyReply) {
          return {
            statusCode: reply.statusCode,
          };
        },
        req(request: FastifyRequest) {
          return {
            method: request.method,
            url: request.url,
            path: request.routerPath,
            parameters: request.params,
          };
        },
      },
    };
  }
}
