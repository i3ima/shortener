"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20201229164424 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20201229164424 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "url" rename column "hash" to "short";');
        this.addSql('alter table "url" drop constraint "url_hash_unique";');
        this.addSql('alter table "url" add constraint "url_short_unique" unique ("short");');
    }
}
exports.Migration20201229164424 = Migration20201229164424;
//# sourceMappingURL=Migration20201229164424.js.map