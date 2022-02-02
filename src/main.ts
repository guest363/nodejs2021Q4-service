import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AjvValidationPipe } from 'nestjs-ajv-glue';
import { AppModule } from './app.module';
import { config } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  /** Добавить @AjvQuery @AjvBody @AjvParams валидаторы */
  app.useGlobalPipes(new AjvValidationPipe());

  await app.listen(config.PORT, '0.0.0.0');
}
bootstrap();
