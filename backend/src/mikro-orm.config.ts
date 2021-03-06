import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./const";
import { Url } from "./entities/Url";

export default  {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [ Url ],
    debug: !__prod__,
    dbName: 'shortener',
    type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  } as Parameters<typeof MikroORM.init>[0];