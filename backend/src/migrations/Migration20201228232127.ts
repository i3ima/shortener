import { Migration } from '@mikro-orm/migrations';

export class Migration20201228232127 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "url" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "url" text not null, "desc" text not null, "hash" text not null);');
    this.addSql('alter table "url" add constraint "url_url_unique" unique ("url");');
    this.addSql('alter table "url" add constraint "url_desc_unique" unique ("desc");');
    this.addSql('alter table "url" add constraint "url_hash_unique" unique ("hash");');

    this.addSql('drop table if exists "user" cascade;');
  }

}
