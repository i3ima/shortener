"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20201228232127 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20201228232127 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "url" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "url" text not null, "desc" text not null, "hash" text not null);');
        this.addSql('alter table "url" add constraint "url_url_unique" unique ("url");');
        this.addSql('alter table "url" add constraint "url_desc_unique" unique ("desc");');
        this.addSql('alter table "url" add constraint "url_hash_unique" unique ("hash");');
        this.addSql('drop table if exists "user" cascade;');
    }
}
exports.Migration20201228232127 = Migration20201228232127;
//# sourceMappingURL=Migration20201228232127.js.map