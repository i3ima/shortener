"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20201228224340 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20201228224340 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "ip" text not null);');
        this.addSql('alter table "user" add constraint "user_ip_unique" unique ("ip");');
    }
}
exports.Migration20201228224340 = Migration20201228224340;
//# sourceMappingURL=Migration20201228224340.js.map