"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const UrlResolver_1 = require("./resolvers/UrlResolver");
const Url_1 = require("./entities/Url");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = express_1.default();
    app.listen(4000, () => {
        console.log("⚡ [Express]: Server is running at https://localhost:4000");
    });
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient();
    app.use(express_session_1.default({
        name: "uid",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 99999999,
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        },
        secret: "dasdds",
        resave: false,
        saveUninitialized: false
    }));
    const server = new apollo_server_express_1.ApolloServer({
        playground: {
            settings: {
                "editor.theme": 'dark'
            },
        },
        schema: await type_graphql_1.buildSchema({
            resolvers: [UrlResolver_1.UrlResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            em: orm.em, req, res
        }),
    });
    app.get("/:shortUrl", async (req, res) => {
        const shortUrl = await orm.em.findOne(Url_1.Url, { short: req.params.shortUrl });
        console.log(shortUrl === null || shortUrl === void 0 ? void 0 : shortUrl.url);
        (shortUrl === null || shortUrl === void 0 ? void 0 : shortUrl.url) == undefined ? undefined : res.redirect(shortUrl === null || shortUrl === void 0 ? void 0 : shortUrl.url);
    });
    console.log("✅ [Apollo]: Middleware applied");
    server.applyMiddleware({ app, cors: { origin: "http://localhost:3000" } });
};
main();
//# sourceMappingURL=index.js.map