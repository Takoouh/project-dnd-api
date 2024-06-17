import { Migration } from '@mikro-orm/migrations';

export class Migration20240615195159 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null default gen_random_uuid(), "nickname" varchar(255) not null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_nickname_unique" unique ("nickname");');
  }

}
