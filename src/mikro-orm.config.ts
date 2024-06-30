import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';

import 'dotenv/config';

const logger = new Logger('MikroORM');

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.DATABASE_NAME,
  allowGlobalContext: true,
  driver: PostgreSqlDriver,
  debug: !isProd,
  logger: logger.log.bind(logger),
  extensions: [Migrator, ...(!isProd ? [SeedManager] : [])],
  ...(isProd && {
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
