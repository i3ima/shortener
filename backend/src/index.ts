import { MikroORM } from "@mikro-orm/core"
import express, { Router } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import MikroConf from "./mikro-orm.config";
import { MyContext } from "./types";
import redis from "redis";
import session from "express-session"
import connectRedis  from "connect-redis";
import { __prod__ } from "./const";
import { UrlResolver } from "./resolvers/UrlResolver";
import { Url } from "./entities/Url";

const main = async () => {
    
    const orm = await MikroORM.init(MikroConf)
    await orm.getMigrator().up()
    const app = express()
    app.listen(4000, () => {
        console.log("⚡ [Express]: Server is running at https://localhost:4000")
    })
    
    const server = new ApolloServer({
        playground: {
            settings: {
                "editor.theme": 'dark'
            },
        },
        schema: await buildSchema({
            resolvers: [UrlResolver],
            validate: false,
        }),
        context: ({req, res}): MyContext => ({
            em: orm.em, req, res
          }),
    })

    // Tricky
    app.get("/:shortUrl", async (req, res) => {
      const shortUrl = await orm.em.findOne(Url, {short: req.params.shortUrl})
      console.log(shortUrl?.url)
      shortUrl?.url == undefined ? undefined : res.redirect(shortUrl?.url)
    })
    //Applying apollo middleware, __AFTER__ listen
    console.log("✅ [Apollo]: Middleware applied")
    server.applyMiddleware({ app, cors: {origin: "http://localhost:3000"} })
}

main()