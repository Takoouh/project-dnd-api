import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/postgresql';
import * as cookieParser from 'cookie-parser';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'verbose', 'warn'],
  });

  const orm = await MikroORM.init();

  const migrator = orm.getMigrator();
  await migrator.up();

  orm.close(true);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser(process.env.COOKIE_SECRET));
  const port = parseInt(process.env.PORT) | 3000;
  console.log(port);
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
