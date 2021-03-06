import { Migration } from '@mikro-orm/migrations';

export class Migration20201228224340 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "ip" text not null);');
    this.addSql('alter table "user" add constraint "user_ip_unique" unique ("ip");');
  }

}
