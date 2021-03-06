import { Migration } from '@mikro-orm/migrations';

export class Migration20201229164424 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "url" rename column "hash" to "short";');


    this.addSql('alter table "url" drop constraint "url_hash_unique";');

    this.addSql('alter table "url" add constraint "url_short_unique" unique ("short");');
  }

}
