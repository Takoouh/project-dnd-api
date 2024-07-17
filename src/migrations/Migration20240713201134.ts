import { Migration } from '@mikro-orm/migrations';

export class Migration20240713201134 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user_item" drop constraint "user_item_user_id_foreign";',
    );

    this.addSql(
      'create table "areas" ("id" varchar(255) not null, "name" varchar(255) not null, "area_group" text check ("area_group" in (\'town\', \'stratia-dungeon\', \'wilderness\')) not null, "is_available" boolean not null default false, "trees" text[] not null default \'{}\', "mining_rocks" text[] not null default \'{}\', "monsters" text[] not null default \'{}\', "has_inn" boolean not null default false, "unlocked_by" varchar(255) null, constraint "areas_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "users" ("id" uuid not null default gen_random_uuid(), "nickname" varchar(255) not null, "password" varchar(255) not null, "location" varchar(255) not null default \'sunset-town\', "cooking_xp" int not null default 0, "fishing_xp" int not null default 0, "mining_xp" int not null default 0, "smithing_xp" int not null default 0, "woodcutting_xp" int not null default 0, constraint "users_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "users" add constraint "users_nickname_unique" unique ("nickname");',
    );

    this.addSql(
      'create table "user_items" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "item_id" int not null, "quantity" int not null default 1, constraint "user_items_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "user_items" add constraint "user_items_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "user_item" cascade;');

    this.addSql(
      "insert into \"areas\" (\"id\",\"name\", \"area_group\",\"is_available\",\"has_inn\",\"trees\",\"mining_rocks\",\"monsters\") VALUES ('sunset-town','Sunset Town', 'town', true, true,'{}', '{}', '{}'),('strate-1','Strate 1', 'stratia-dungeon', true,false, '{Tree}', '{Copper rocks}', '{Rat,Chicken,Spider}'),('bob-farm','Bob Farm', 'wilderness', true,false, '{}', '{}', '{Rat,Chicken,Rabbit,Cow}');",
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user_items" drop constraint "user_items_user_id_foreign";',
    );

    this.addSql(
      'create table "user" ("id" uuid not null default gen_random_uuid(), "nickname" varchar(255) not null, "password" varchar(255) not null, "cooking_xp" int not null default 0, "fishing_xp" int not null default 0, "mining_xp" int not null default 0, "smithing_xp" int not null default 0, "woodcutting_xp" int not null default 0, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "user" add constraint "user_nickname_unique" unique ("nickname");',
    );

    this.addSql(
      'create table "user_item" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "item_id" int not null, "quantity" int not null default 1, constraint "user_item_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "user_item" add constraint "user_item_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );

    this.addSql('drop table if exists "areas" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "user_items" cascade;');
  }
}
