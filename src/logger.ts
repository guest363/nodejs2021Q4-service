import { FastifyInstance } from 'fastify';
import pino from 'pino';



enum logLevels {
  error = 0, // (ошибка)
  warn = 1, // (предупреждение)
  info = 2, // (информация)
  debug = 3, // (отладочное сообщение)
  trace = 4, // (все сообщения)
}

/**
 * Куда писать какие логи
 */
const targets = [
  /** Все остальное пишем в info.log */
  {
    level: logLevels[logLevels.trace] as pino.LevelWithSilent,
    options: { destination: './log/info.log', mkdir: true },
    target: 'pino/file',
  },
  {
    level: logLevels[logLevels.error] as pino.LevelWithSilent,
    options: { destination: './log/error.log', mkdir: true },
    target: 'pino/file',
  },
];

const multyStreamsConfig = pino.transport({ targets: targets });

/**
 * Класс отвечающий за логирование в приложении
 */
export class Logger {
  logLevel = 0;

  /**
   * @param logLevel - Уровни логировани от 0 до 4
   */
  constructor(logLevel: logLevels) {
    this.logLevel = logLevel;
  }

  /**
   * Инициализирует хук для логирование тела запросса
   */
  public initHooks(app: FastifyInstance) {
    if (this.logLevel >= logLevels.info) {
      app.addHook('preHandler', (req, _reply, done) => {
        if (req.body) {
          req.log.info({ body: req.body }, 'parsed body');
        }
        done();
      });
    }
  }

  /**
   * Возвращает логер
   */
  public getLogger() {
    return pino(
      {
        level: logLevels[this.logLevel],
        serializers: {
          res(reply) {
            return {
              statusCode: reply.statusCode,
            };
          },
          req(request) {
            return {
              method: request.method,
              url: request.url,
              path: request.routerPath,
              parameters: request.params,
            };
          },
        },
      },
      multyStreamsConfig
    );
  }
}
