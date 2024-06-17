import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';

import 'dotenv/config';

const logger = new Logger('MikroORM');

export default defineConfig({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.DATABASE_NAME,
  driver: PostgreSqlDriver,
  debug: process.env.NODE_ENV === 'develop',
  logger: logger.log.bind(logger),
  extensions: [Migrator],
  ...(process.env.NODE_ENV === 'production' && {
    driverOptions: {
      connection: { ssl: true },
    },
  }),
  migrations: {
    disableForeignKeys: false,
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
});
