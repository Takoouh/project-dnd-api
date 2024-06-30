import { MikroORM } from '@mikro-orm/postgresql';
import { UserSeeder } from '../seeders/UserSeeder';
import 'tsconfig-paths/register';
//eslint-disable-next-line
require('dotenv').config({ path: './.env.test' });

module.exports = async function () {
  //set UTC
  process.env.TZ = 'UTC';

  const orm = await MikroORM.init();
  const migrator = orm.getMigrator();
  const isMigrationNeeded = await migrator.checkMigrationNeeded();
  if (isMigrationNeeded) {
    console.log('\nInit db and migration');
    try {
      await migrator.up(); // runs migrations up to the latest
      console.log('----- Migration successfully executed -----');
    } catch (error) {
      console.log('----- Error while executing migration -----');
      console.log(error);
    }
  }

  // Get seeder from MikroORM
  const seeder = orm.getSeeder();

  // Refresh the database to start clean (work in mongo too since v5)
  await orm.schema.refreshDatabase();

  // Seed using a seeder defined by you
  await seeder.seed(UserSeeder);

  await orm?.close(true);
};
