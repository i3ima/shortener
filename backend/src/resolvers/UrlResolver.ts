import { Url } from "../entities/Url";
import { MyContext } from "../types";
import { ObjectType, Field, Arg, Ctx, Query, Mutation, Resolver } from "type-graphql";
import shortid, { generate } from "shortid"
import { StringUtils } from "turbocommons-ts";
import { error } from "console";


@ObjectType()
class ErrorField {
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
class UrlResponse {
    @Field(() => [ErrorField], { nullable: true })
    errors?: [ErrorField];

    @Field(() => Url, { nullable: true })
    url?: Url;
}

@Resolver(Url)
export class UrlResolver {

    @Mutation(() => UrlResponse)
    async createUrl(
        @Arg('url') URL: string,
        @Ctx() { em }: MyContext): Promise<UrlResponse> {
        URL = "https://" + URL;
            if (!StringUtils.isUrl(URL)) {
            return {
                errors: [
                    {
                        field: "url",
                        message: "This is not a valid URL!"
                    }
                ]
            }

        }
        const shorted = generate()
        
        let url;
        try {
            url = await em.findOne(Url, { url: URL })
        } catch (error) {

        }
        if (url) {
            return {url}
        }

        url = await em.create(Url, { url: URL, short: shorted })
        try {
            await em.persistAndFlush(url)
        } catch (error) {
            console.log(error)
        }

        return { url };
    }
}