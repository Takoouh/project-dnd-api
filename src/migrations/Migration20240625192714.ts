import { Migration } from '@mikro-orm/migrations';

export class Migration20240625192714 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_item" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "item_id" int not null, "quantity" int not null default 1, constraint "user_item_pkey" primary key ("id"));');

    this.addSql('alter table "user_item" add constraint "user_item_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "user" add column "cooking_xp" int not null default 0, add column "fishing_xp" int not null default 0, add column "mining_xp" int not null default 0, add column "smithing_xp" int not null default 0, add column "woodcutting_xp" int not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_item" cascade;');

    this.addSql('alter table "user" drop column "cooking_xp", drop column "fishing_xp", drop column "mining_xp", drop column "smithing_xp", drop column "woodcutting_xp";');
  }

}
